/* src/lib/availability.ts
 * MIT Licence — (c) Free Names
 */

// Subdomain lookups against each registry repo, same approach as is-a.dev's checker

import { domains, type FreeDomain } from '#lib';

export type Availability =
	| { state: 'available' }
	| { state: 'reserved' }
	| { state: 'taken'; owner: string }
	| { state: 'soon' }
	| { state: 'error' };

const rawBase = 'https://raw.githubusercontent.com';

// Labels split by dots, each starting with a letter, digit or underscore
const namePattern = /^[a-z0-9_][a-z0-9_-]*(\.[a-z0-9_][a-z0-9_-]*)*$/;

const reservedCache = new Map<string, Promise<string[]>>();

export function normaliseName(input: string): string {
	return input.trim().toLowerCase().replace(/\s+/g, '-');
}

export function isValidName(name: string): boolean {
	return name.length > 0 && name.length <= 63 && namePattern.test(name);
}

// Entries containing '[' are regex patterns, the rest are exact names
export function isReserved(name: string, reserved: string[]): boolean {
	return reserved.some((entry) =>
		entry.includes('[') ? new RegExp(`^(?:${entry})$`).test(name) : entry === name
	);
}

function fetchReserved(repo: string): Promise<string[]> {
	const cached = reservedCache.get(repo);
	if (cached) return cached;

	// A registry without a reserved list just has nothing reserved
	const reserved: Promise<string[]> = fetch(`${rawBase}/${repo}/main/json/reserved.json`)
		.then<string[]>((response) => (response.ok ? response.json() : []))
		.catch(() => []);

	reservedCache.set(repo, reserved);

	return reserved;
}

export async function checkName(
	name: string,
	repo: string | null,
	signal?: AbortSignal
): Promise<Availability> {
	if (!repo) return { state: 'soon' };

	try {
		const reserved = await fetchReserved(repo);
		const rootLabel = name.split('.').pop() ?? name;

		// The registries also reserve every name nested under a reserved one
		if (isReserved(name, reserved) || isReserved(rootLabel, reserved)) return { state: 'reserved' };

		const response = await fetch(`${rawBase}/${repo}/main/domains/${name}.json`, {
			signal
		});

		if (response.status === 404) return { state: 'available' };
		if (!response.ok) return { state: 'error' };

		const file: { owner?: { username?: string } } = await response.json();

		return {
			state: 'taken',
			owner: String(file?.owner?.username ?? 'someone')
		};
	} catch {
		return { state: 'error' };
	}
}

// Splits "example.is-a.wiki" into its domain and subdomain name, or null if it isn't one of ours
export function splitHostname(hostname: string): { domain: FreeDomain; name: string } | null {
	const host = hostname.trim().toLowerCase();

	for (const domain of domains) {
		const suffix = `.${domain.name}`;

		if (host.endsWith(suffix) && host.length > suffix.length) {
			return {
				domain,
				name: host.slice(0, -suffix.length)
			};
		}
	}

	return null;
}
