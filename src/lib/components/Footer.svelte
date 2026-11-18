<!-- src/lib/components/Footer.svelte
     MIT Licence — (c) Free Names
-->

<script lang="ts">
	import { siteName, websiteDomain } from '#lib';

	const year = new Date().getFullYear();
</script>

<footer>
	<span>{websiteDomain}</span>
	<span>Free subdomains, forever free</span>
	<span>&copy; {year} {siteName}</span>
</footer>

<style>
	footer {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1.5rem;
		justify-content: space-between;
		width: 100%;
		max-width: 62rem;
		margin: auto auto 0;
		padding: 1.25rem 1.5rem;
		border-top: 1px solid var(--line);
		color: var(--muted);
		font-size: 0.85rem;
	}

	@media (max-width: 40rem) {
		footer {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}
	}
</style>
