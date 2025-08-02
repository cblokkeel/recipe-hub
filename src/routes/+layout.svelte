<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { setupConvexAuth } from '@mmailaender/convex-auth-svelte/sveltekit';
	import { convexClient } from '$lib/convex';

	let { children, data } = $props();

	setupConvexAuth({
		getServerState: () => data.authState,
		client: convexClient
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
