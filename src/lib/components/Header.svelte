<!-- src/lib/components/Header.svelte
     MIT Licence — (c) Free Names
-->

<script lang="ts">
	import { discordInvite, docsUrl, githubUrl, websiteDomain } from '#lib';
</script>

<header>
	<a class="brand" href="/">
		<img src="/favicon.svg" alt="" width="28" height="28" />
		<span>{websiteDomain}</span>
	</a>

	<nav>
		<a href="/#check">Check a name</a>
		<a href="/#register">Register</a>
		<a href={docsUrl} target="_blank" rel="noopener">Docs</a>
		<a href="/terms">Terms</a>
		<a href={githubUrl} target="_blank" rel="noopener">GitHub</a>
		<a href={discordInvite} target="_blank" rel="noopener">Discord</a>
	</nav>
</header>

<style>
	header {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem 1.5rem;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		max-width: 62rem;
		margin: 0 auto;
		padding: 1.25rem 1.5rem;
	}

	.brand {
		display: inline-flex;
		gap: 0.6rem;
		align-items: center;
		font-weight: 600;
		text-decoration: none;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.25rem;
		font-size: 0.9rem;
	}

	nav a {
		color: var(--muted);
		text-decoration: none;
	}

	nav a:hover {
		color: var(--text);
	}

	@media (max-width: 30rem) {
		header {
			padding-inline: 1rem;
		}
	}
</style>
