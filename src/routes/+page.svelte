<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import type { PageProps } from './$types';
	import Recipe from '$lib/recipes/Recipe.svelte';
	import { Search } from '@lucide/svelte';

	let { data }: PageProps = $props();

	let filter = $state('');

	const filteredRecipes = $derived(
		data.recipes.filter((recipe) => recipe.name.toLowerCase().includes(filter.toLowerCase()))
	);
</script>

<div class="flex flex-col gap-4">
	<div class=" flex items-center justify-between">
		<h1 class="text-lg font-bold">{m['recipes.title']()}</h1>
		<a class="btn" href="/create-recipe/manual">{m['recipes.add_recipe']()}</a>
	</div>

	<label class="input flex w-full items-center">
		<Search size="16" />
		<input type="text" required placeholder={m['recipes.search_recipes']()} bind:value={filter} />
	</label>

	<div>
		{#each filteredRecipes as recipe, index (index)}
			<Recipe {recipe} />
		{/each}
	</div>
</div>
