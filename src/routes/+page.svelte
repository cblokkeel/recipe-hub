<script lang="ts">
	import { useAuth } from '@mmailaender/convex-auth-svelte/sveltekit';

	const isAuthenticated = $derived(useAuth().isAuthenticated);
	const { signIn, signOut } = useAuth();

	function loginWithGoogle() {
		signIn('google');
	}
</script>

{#if isAuthenticated}
	<button onclick={signOut}>Logout</button>
{:else}
	<button onclick={loginWithGoogle}>Sign in</button>
{/if}
