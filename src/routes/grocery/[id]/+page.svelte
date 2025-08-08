<script lang="ts">
	import type { PageProps } from './$types';
	import * as m from '$lib/paraglide/messages.js';
	import { onMount } from 'svelte';
	import { useConvexClient } from 'convex-svelte';
	import { api } from '../../../convex/_generated/api';
	import type { Recipe } from '../../../convex/recipe';
	import type { Id } from '../../../convex/_generated/dataModel';
	import RecipeShowcase from '$lib/recipes/RecipeShowcase.svelte';

	const convex = useConvexClient();

	let recipesById = $state<Record<string, Recipe>>({});

	const { data }: PageProps = $props();

	onMount(async () => {
		// TODO: add an index on recipe with grocery id?
		const userRecipes = await convex.query(api.recipe.recipeByUser, {});

		userRecipes.forEach((r) => {
			if (!data.grocery.recipes.includes(r._id as Id<'recipes'>)) {
				return;
			}

			recipesById[r._id] = r;
		});
	});
</script>

<section class="flex flex-col gap-4 pb-8">
	<div>
		<h1 class="text-xl font-bold">{m['grocery.list.title']()}</h1>
	</div>

	<div>
		<ul class="flex list-inside list-disc flex-col gap-2">
			{#each data.grocery.groceries as item, index (index)}
				<li>{item}</li>
			{/each}
		</ul>
	</div>

	{#if data.grocery.recipes.length > 0 && Object.keys(recipesById).length > 0}
		<h2 class="text-lg font-bold">{m['grocery.list.recipes_used']()}</h2>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each data.grocery.recipes as recipeId (recipeId)}
				<div class="cursor-pointer transition-transform hover:-translate-y-1">
					<RecipeShowcase recipe={recipesById[recipeId]} />
				</div>
			{/each}
		</div>
	{/if}
</section>
