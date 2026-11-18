<!-- src/routes/terms/+page.svelte
     MIT Licence — (c) Free Names
-->

<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Terms of Service | Free Names</title>
	<meta name="description" content="The Terms of Service for every Free Names domain." />
</svelte:head>

<p class="eyebrow">Free Names</p>

<section class="terms">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- our own TOS.md, rendered at build time -->
	{@html data.html}
</section>

<style>
	.terms {
		margin-top: 0;
	}

	.terms :global(h2) {
		margin-top: 2.5rem;
	}

	.terms :global(h3) {
		margin: 1.5rem 0 0.5rem;
		color: var(--text);
	}

	.terms :global(strong) {
		color: var(--text);
	}
</style>
