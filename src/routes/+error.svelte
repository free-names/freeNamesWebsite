<!-- src/routes/+error.svelte
     MIT Licence — (c) Free Names
-->

<script lang="ts">
	import { page } from '$app/state';

	const notFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{notFound ? 'Page Not Found' : 'Error'} | Free Names</title>
</svelte:head>

<p class="eyebrow">Error {page.status}</p>
<h1>{notFound ? 'Page not found' : 'Something went wrong'}</h1>

<section>
	<p>
		{notFound ? "The page you're looking for doesn't exist." : page.error?.message}
		<a href="/">Go back home</a>
	</p>
</section>
