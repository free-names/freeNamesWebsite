<!-- src/routes/available/+page.svelte
     MIT Licence — (c) Free Names
-->

<script lang="ts">
	import { docsUrl, siteName } from '#lib';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const free = $derived(data.result.state === 'available');
</script>

<svelte:head>
	<title>{data.fullName} | {siteName}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<p class="eyebrow">{siteName}</p>
<h1><code>{data.fullName}</code></h1>

<section class="status" data-state={data.result.state}>
	{#if free}
		<h2>It&apos;s free!</h2>
		<p>Nobody has registered this subdomain yet. It could be yours.</p>
		<ul class="links">
			<li>
				<a href="https://github.com/{data.repo}" target="_blank" rel="noopener">
					Open the registry
				</a>
			</li>
			<li><a href={docsUrl} target="_blank" rel="noopener">Read how to register</a></li>
		</ul>
	{:else if data.result.state === 'taken'}
		<h2>Already registered</h2>
		<p>
			This subdomain belongs to
			<a
				href="https://github.com/{encodeURIComponent(data.result.owner)}"
				target="_blank"
				rel="noopener"
			>
				{data.result.owner}
			</a>. Its records may still be propagating.
		</p>
	{:else}
		<h2>Couldn&apos;t check</h2>
		<p>We couldn&apos;t reach the registry just now. Refresh to try again.</p>
	{/if}

	<p><a href="/#check">Check another name</a></p>
</section>

<style>
	h1 code {
		overflow-wrap: anywhere;
	}

	.status {
		padding-left: 1rem;
		border-left: 3px solid var(--line);
	}

	.status[data-state='available'] {
		border-left-color: var(--good);
	}

	.status[data-state='taken'] {
		border-left-color: var(--bad);
	}
</style>
