<!-- src/lib/components/DomainChecker.svelte
     MIT Licence — (c) Free Names
-->

<script lang="ts">
	import { docsUrl, domains } from '#lib';
	import { checkName, isValidName, normaliseName, type Availability } from '#lib/availability.ts';

	let input = $state('');
	let results = $state<Record<string, Availability | 'checking'>>({});

	const name = $derived(normaliseName(input));
	const valid = $derived(isValidName(name));

	$effect(() => {
		const current = name;

		results = {};
		if (!isValidName(current)) return;

		const controller = new AbortController();

		// Wait for typing to settle so we don't hit GitHub on every key
		const timer = setTimeout(() => {
			for (const domain of domains) {
				results[domain.name] = 'checking';

				checkName(current, domain.repo, controller.signal).then((result) => {
					if (!controller.signal.aborted) results[domain.name] = result;
				});
			}
		}, 500);

		return () => {
			clearTimeout(timer);
			controller.abort();
		};
	});
</script>

<label class="search">
	<span class="sr-only">Subdomain name</span>
	<input
		bind:value={input}
		type="text"
		placeholder="e.g. clove"
		autocomplete="off"
		autocapitalize="off"
		spellcheck="false"
	/>
</label>

{#if name && !valid}
	<p class="hint">
		Use letters, numbers, dashes and underscores, with dots between parts. Max 63 characters.
	</p>
{/if}

{#if valid}
	<ul class="results" aria-live="polite">
		{#each domains as domain (domain.name)}
			{@const result = results[domain.name]}

			<li class="result" data-state={result === 'checking' ? 'checking' : result?.state}>
				<code class="full-name">{name}.{domain.name}</code>

				<span class="status">
					{#if !result || result === 'checking'}
						Checking…
					{:else if result.state === 'available'}
						Available! <a href={docsUrl} target="_blank" rel="noopener">Register it</a>
					{:else if result.state === 'taken'}
						<img
							src="https://github.com/{encodeURIComponent(result.owner)}.png?size=48"
							alt=""
							width="24"
							height="24"
						/>
						Owned by
						<a
							href="https://github.com/{encodeURIComponent(result.owner)}"
							target="_blank"
							rel="noopener"
						>
							{result.owner}
						</a>
					{:else if result.state === 'reserved'}
						Reserved
					{:else if result.state === 'soon'}
						Coming soon
					{:else}
						Couldn&apos;t check, try again
					{/if}
				</span>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.search input {
		width: 100%;
		padding: 0.75rem 1rem;
		border: 1px solid var(--line);
		border-radius: 0.6rem;
		background: var(--raised);
		color: var(--text);
		font-family: var(--mono);
		font-size: 1.15rem;
		box-shadow: 0 0 0 4px var(--accent-dim);
	}

	.search input::placeholder {
		color: var(--muted);
	}

	.hint {
		color: var(--muted);
		font-size: 0.9rem;
	}

	.results {
		display: grid;
		gap: 0.5rem;
		margin: 1rem 0 0;
		padding: 0;
		list-style: none;
	}

	.result {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1rem;
		align-items: center;
		justify-content: space-between;
		padding: 0.6rem 1rem;
		border: 1px solid var(--line);
		border-left: 3px solid var(--line);
		border-radius: 0.5rem;
		background: var(--raised);
	}

	.result[data-state='available'] {
		border-left-color: var(--good);
	}

	.result[data-state='taken'],
	.result[data-state='reserved'] {
		border-left-color: var(--bad);
	}

	.result[data-state='soon'],
	.result[data-state='checking'] {
		opacity: 0.7;
	}

	.full-name {
		overflow-wrap: anywhere;
	}

	.status {
		display: inline-flex;
		gap: 0.4rem;
		align-items: center;
		color: var(--muted);
		font-size: 0.9rem;
	}

	.status img {
		border-radius: 50%;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
	}
</style>
