<!-- src/routes/+layout.svelte
     MIT Licence — (c) Free Names
-->

<script lang="ts">
	import '#lib/styles/theme.css';
	import '#lib/styles/global.css';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<meta name="theme-color" content="#eb459e" />
	<meta property="og:site_name" content="Free Names" />
	<meta property="og:type" content="website" />
</svelte:head>

<Header />

<main>
	{@render children()}
</main>

<Footer />
