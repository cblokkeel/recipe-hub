<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { setupConvexAuth } from '@mmailaender/convex-auth-svelte/sveltekit';
	import Header from '$lib/layout/Header.svelte';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';

	let { children, data } = $props();

	setupConvexAuth({
		getServerState: () => data.authState,
		convexUrl: PUBLIC_CONVEX_URL
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />

	<main class="flex flex-grow flex-col px-24">
		{@render children?.()}
	</main>
</div>
