<script lang="ts">
	import { useAuth } from '@mmailaender/convex-auth-svelte/svelte';
	import { useQuery } from 'convex-svelte';
	import { api } from '../../convex/_generated/api';

	const { signOut } = useAuth();

	const isAuthenticated = $derived(useAuth().isAuthenticated);
	const userQuery = useQuery(api.user.getViewer, {});
</script>

<div class="mb-8 navbar border-b-1 border-base-200 px-8 py-8">
	<div class="flex-1">
		<a href="/" class="btn text-xl btn-ghost">RecipeHub</a>
	</div>
	{#if isAuthenticated}
		<div class="flex-none">
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn avatar btn-circle btn-ghost">
					{#if userQuery.isLoading}
						<div class=" w-10 skeleton rounded-full"></div>
					{:else}
						<div class="w-10 rounded-full">
							<img alt="profile picture" src={userQuery?.data?.image} />
						</div>
					{/if}
				</div>
				<ul class="dropdown-content menu z-1 mt-3 w-52 menu-sm rounded-box bg-base-100 p-2 shadow">
					<li><button onclick={signOut}>Logout</button></li>
				</ul>
			</div>
		</div>
	{/if}
</div>
