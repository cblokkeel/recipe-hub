<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import type { PageProps } from './$types';
	import RecipeShowcase from '$lib/recipes/RecipeShowcase.svelte';
	import { Search } from '@lucide/svelte';
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	let { data }: PageProps = $props();

	let filter = $state('');

	const filteredRecipes = $derived(
		data.recipes.filter((recipe) => recipe.name.toLowerCase().includes(filter.toLowerCase()))
	);
</script>

<div class="flex flex-col gap-4">
	<div class=" flex items-center justify-between">
		<h1 class="text-xl font-bold">{m['recipes.title']()}</h1>
		<a class="btn" href="/create-recipe/manual">{m['recipes.add_recipe']()}</a>
	</div>

	<label class="input flex w-full items-center">
		<Search size="16" />
		<input type="text" required placeholder={m['recipes.search_recipes']()} bind:value={filter} />
	</label>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
		{#if filteredRecipes.length === 0}
			<p class="text-accent">{m['recipes.no_recipes']()}</p>
		{/if}
		{#each filteredRecipes as recipe (recipe._id)}
			<div
				animate:flip={{ duration: 250 }}
				in:fade={{ duration: 150 }}
				out:fade={{ duration: 150 }}
				class="transition-transform hover:-translate-y-1"
			>
				<RecipeShowcase {recipe} />
			</div>
		{/each}
	</div>
</div>
