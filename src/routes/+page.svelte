<!-- src/routes/+page.svelte
     MIT Licence — (c) Free Names
-->

<script lang="ts">
	import DomainChecker from '#lib/components/DomainChecker.svelte';
	import { discordInvite, docsUrl, domains, githubUrl, siteName } from '#lib';

	// ".meowed-at.me, .is-a.stupid.cat, .has-a.space or .is-a.wiki"
	const domainList = new Intl.ListFormat('en-GB', { type: 'disjunction' }).format(
		domains.map((domain) => `.${domain.name}`)
	);

	const description =
		'Free subdomains on meowed-at.me, is-a.stupid.cat, has-a.space and is-a.wiki. Register with a pull request.';

	const exampleFile = `{
    "owner": {
        "username": "your-github-username",
        "email": "hello@example.com"
    },

    "records": {
        "CNAME": "example.com"
    },

    "proxied": false
}`;
</script>

<svelte:head>
	<title>{siteName}: free subdomains</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={siteName} />
	<meta property="og:description" content={description} />
</svelte:head>

<div class="hero">
	<div>
		<p class="eyebrow">{siteName}</p>
		<h1>A cute little subdomain, for free.</h1>
		<p class="subtitle">Grab your own {domainList} subdomain.</p>
	</div>

	<img class="emblem" src="/favicon.svg" alt="" width="160" height="160" />
</div>

<section id="check">
	<h2>Check a name</h2>
	<DomainChecker />
</section>

<section id="register">
	<h2>Register</h2>
	<ol>
		<li>Fork the registry repo for the domain you want (links below).</li>
		<li>
			Add a file in <code>domains/</code> named after your subdomain, like
			<code>clove.json</code>.
		</li>
		<li>Fill it in with your GitHub details and the DNS records you need.</li>
		<li>Open a pull request and wait for it to be merged.</li>
		<li>Records usually go live within 15 to 20 minutes. Rarely, it takes up to 48 hours.</li>
	</ol>

	<p>
		The full guide, with every record type and common setups, is in the
		<a href={docsUrl} target="_blank" rel="noopener">documentation</a>.
	</p>

	<pre><code>{exampleFile}</code></pre>

	<p>
		Supported records: <code>A</code>, <code>AAAA</code>, <code>CNAME</code>, <code>MX</code>,
		<code>TXT</code>, <code>NS</code>, <code>SRV</code> and <code>DS</code>. Only add the ones you
		need.
	</p>

	<ul class="links">
		{#each domains as domain (domain.name)}
			<li>
				{#if domain.repo}
					<a href="https://github.com/{domain.repo}" target="_blank" rel="noopener">
						{domain.name} registry
					</a>
				{:else}
					<span>{domain.name} (coming soon)</span>
				{/if}
			</li>
		{/each}
	</ul>
</section>

<section>
	<h2>Links</h2>
	<ul class="links">
		<li><a href={docsUrl} target="_blank" rel="noopener">Documentation</a></li>
		<li><a href="/terms">Terms of Service</a></li>
		<li><a href={githubUrl} target="_blank" rel="noopener">GitHub</a></li>
		<li><a href={discordInvite} target="_blank" rel="noopener">Discord Server</a></li>
	</ul>
</section>

<section>
	<h2>Report abuse</h2>
	<p>
		If a subdomain is being used for abuse, open an issue on that domain&apos;s registry repo, or
		tell us on <a href={discordInvite} target="_blank" rel="noopener">Discord</a>.
	</p>
</section>

<style>
	.hero {
		display: flex;
		gap: 1rem 3rem;
		align-items: center;
		justify-content: space-between;
	}

	.emblem {
		flex-shrink: 0;
		filter: drop-shadow(0 0 24px var(--accent-dim));
	}

	@media (max-width: 40rem) {
		.emblem {
			display: none;
		}
	}
</style>
