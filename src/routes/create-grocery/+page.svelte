<script lang="ts">
	import { useConvexClient, useQuery } from 'convex-svelte';
	import { api } from '../../convex/_generated/api';
	import { Search } from '@lucide/svelte';
	import * as m from '$lib/paraglide/messages.js';
	import type { Id } from '../../convex/_generated/dataModel';

	const convex = useConvexClient();

	const recipesQuery = useQuery(api.recipe.recipeByUser, {});

	let filter = $state('');
	let isGenerating = $state(false);
	let selectedRecipes = $state<string[]>([]);

	const filteredRecipes = $derived(
		recipesQuery?.data?.filter((recipe) =>
			recipe.name.toLowerCase().includes(filter.toLowerCase())
		) ?? []
	);

	function handleRecipeCheckboxInput(e: Event) {
		filter = '';
		const checkbox = e.target as HTMLInputElement;
		const recipeId = checkbox.id;

		if (!checkbox.checked) {
			selectedRecipes = selectedRecipes.filter((id) => id !== recipeId);
			return;
		}

		if (!selectedRecipes.includes(recipeId)) {
			selectedRecipes = [...selectedRecipes, recipeId];
		}
	}

	async function generateGroceryList() {
		isGenerating = true;
		try {
			const groceryId: Id<'groceries'> = await convex.action(api.grocery.createGroceryFromRecipes, {
				recipes: selectedRecipes as Id<'recipes'>[]
			});

			isGenerating = false;
			if (window) {
				window.location.href = `/grocery/${groceryId}`;
			}
		} catch (err) {
			console.error('Error generating grocery list:', err);
			isGenerating = false;
		}
	}
</script>

<div class="flex flex-col gap-4">
	<h1 class="text-xl font-bold">{m['grocery.create.title']()}</h1>

	<label class="input flex w-full items-center">
		<Search size="16" />
		<input type="text" required placeholder={m['recipes.search_recipes']()} bind:value={filter} />
	</label>

	<div class="flex flex-col gap-2">
		{#each filteredRecipes as recipe (recipe._id)}
			<label class="label">
				<input
					id={recipe._id}
					type="checkbox"
					checked={selectedRecipes.includes(recipe._id)}
					oninput={handleRecipeCheckboxInput}
					class="checkbox"
				/>
				{recipe.name}
			</label>
		{/each}
	</div>

	<button disabled={selectedRecipes.length <= 0} class="btn w-fit" onclick={generateGroceryList}>
		{m['grocery.create.generate_list']()}
	</button>
</div>
