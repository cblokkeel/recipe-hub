<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { setupConvexAuth } from '@mmailaender/convex-auth-svelte/sveltekit';
	import Header from '$lib/layout/Header.svelte';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import type { LayoutProps } from './$types';
	import { fly } from 'svelte/transition';
	import { page } from '$app/state';

	let { children, data }: LayoutProps = $props();

	setupConvexAuth({
		getServerState: () => data.authState,
		convexUrl: PUBLIC_CONVEX_URL
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header user={data.user} />

	{#key page.url}
		<main in:fly={{ x: 200, duration: 175 }} class="flex flex-grow flex-col px-8 md:px-24">
			{@render children?.()}
		</main>
	{/key}
</div>
