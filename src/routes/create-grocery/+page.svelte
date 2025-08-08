<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import { api } from '../../convex/_generated/api';
	import { Search } from '@lucide/svelte';
	import * as m from '$lib/paraglide/messages.js';

	const recipesQuery = useQuery(api.recipe.recipeByUser, {});

	let filter = $state('');
	let selectedRecipes = $state<Set<string>>(new Set<string>());

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
			selectedRecipes = new Set(Array.from(selectedRecipes).filter((id) => id !== recipeId));
			return;
		}

		selectedRecipes.add(recipeId);
	}

	async function generateGroceryList() {}
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

	<button disabled={selectedRecipes.length <= 0} class="btn w-fit">
		{m['grocery.create.generate_list']()}
	</button>
</div>
