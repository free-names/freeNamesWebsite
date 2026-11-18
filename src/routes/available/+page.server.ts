/* src/routes/available/+page.server.ts
 * MIT Licence — (c) Free Names
 */

import { error, redirect } from '@sveltejs/kit';
import { checkName, isValidName, splitHostname } from '#lib/availability.ts';

// Cloudflare sends unregistered subdomains here as ?domain=example.is-a.wiki
export async function load({ url }) {
	const hostname = url.searchParams.get('domain') ?? '';
	const split = splitHostname(hostname);

	if (!split || !isValidName(split.name)) {
		error(400, "That isn't a subdomain of one of our domains.");
	}

	const fullName = `${split.name}.${split.domain.name}`;
	const result = await checkName(split.name, split.domain.repo);

	if (result.state === 'reserved') {
		redirect(302, `/reserved?domain=${encodeURIComponent(fullName)}`);
	}

	return {
		fullName,
		repo: split.domain.repo,
		result
	};
}
