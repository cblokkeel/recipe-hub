<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();

	const currentRecipeCreationMode: 'manual' | 'import' = $derived(
		page.url.pathname.includes('/import') ? 'import' : 'manual'
	);
</script>

<div class="flex flex-col gap-4">
	<h1 class="text-lg font-bold">Add recipe</h1>
	<div role="tablist" class="tabs-lift tabs">
		<a
			role="tab"
			class="tab {currentRecipeCreationMode === 'manual' && 'tab-active'}"
			href="/create-recipe/manual">Manual</a
		>
		<div class="tab-content border-base-300 bg-base-100 p-6">
			{@render children?.()}
		</div>

		<a
			role="tab"
			class="tab {currentRecipeCreationMode === 'import' && 'tab-active'}"
			href="/create-recipe/import">Import</a
		>
		<div class="tab-content border-base-300 bg-base-100 p-6">
			{@render children?.()}
		</div>
	</div>
</div>
