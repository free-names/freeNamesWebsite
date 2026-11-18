<!-- src/routes/reserved/+page.svelte
     MIT Licence — (c) Free Names
-->

<script lang="ts">
	import { page } from '$app/state';
	import { siteName } from '#lib';

	// Shown as text only, so an odd value can't do more than look odd
	const fullName = $derived(page.url.searchParams.get('domain') ?? 'This subdomain');
</script>

<svelte:head>
	<title>Reserved | {siteName}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<p class="eyebrow">{siteName}</p>
<h1><code>{fullName}</code></h1>

<section class="status">
	<h2>Reserved</h2>
	<p>
		This name is kept for the project itself, like <code>docs</code> and <code>www</code>, so it
		can&apos;t be registered.
	</p>
	<p><a href="/#check">Check another name</a></p>
</section>

<style>
	h1 code {
		overflow-wrap: anywhere;
	}

	.status {
		padding-left: 1rem;
		border-left: 3px solid var(--bad);
	}
</style>
