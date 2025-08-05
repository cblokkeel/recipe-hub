<script lang="ts">
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages.js';

	let { children } = $props();

	const currentRecipeCreationMode: 'manual' | 'import' = $derived(
		page.url.pathname.includes('/import') ? 'import' : 'manual'
	);
</script>

<div class="flex flex-col gap-4">
	<h1 class="text-xl font-bold">{m['add_recipe.title']()}</h1>
	<div role="tablist" class="tabs-lift tabs">
		<a
			role="tab"
			class="tab {currentRecipeCreationMode === 'manual' && 'tab-active'}"
			href="/create-recipe/manual">{m['add_recipe.manual.title']()}</a
		>
		<div class="tab-content border-base-300 bg-base-100 p-6">
			{@render children?.()}
		</div>

		<a
			role="tab"
			class="tab {currentRecipeCreationMode === 'import' && 'tab-active'}"
			href="/create-recipe/import">{m['add_recipe.import.title']()}</a
		>
		<div class="tab-content border-base-300 bg-base-100 p-6">
			{@render children?.()}
		</div>
	</div>
</div>
