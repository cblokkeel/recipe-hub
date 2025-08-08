<script lang="ts">
	import type { PageProps } from './$types';
	import * as m from '$lib/paraglide/messages.js';
	import placeholder from '$lib/assets/placeholder.png';
	import { useConvexClient } from 'convex-svelte';
	import { api } from '../../../convex/_generated/api';

	const { data }: PageProps = $props();
	const convex = useConvexClient();

	let isDeleting = $state(false);

	async function deleteRecipe() {
		isDeleting = true;

		await convex.mutation(api.recipe.deleteRecipe, {
			id: data.recipe._id
		});

		if (window) {
			window.location.href = '/';
		}
	}
</script>

<section class="flex flex-col gap-4 pb-8">
	<div class="breadcrumbs text-sm">
		<ul>
			<li class="text-accent"><a href="/">{m['recipe.breadcrumbs.my_recipes']()}</a></li>
			<li class="text-primary">{data.recipe.name}</li>
		</ul>
	</div>

	<div class="flex items-center justify-between">
		<h1 class="text-xl font-bold">{data.recipe.name}</h1>
		<button class="btn btn-error" disabled={isDeleting} onclick={deleteRecipe}>
			{#if isDeleting}
				<span class="loading loading-spinner"></span>
				{m['recipe.deleting']()}
			{:else}
				{m['recipe.delete']()}
			{/if}
		</button>
	</div>

	<img
		class="h-48 w-full object-cover md:h-122"
		src={data.recipe.coverUrl ?? placeholder}
		alt="Recipe cover"
	/>

	<div class="flex flex-col gap-2 text-primary">
		<h2 class="font-bold">{m['recipe.ingredients']()}</h2>
		<ul class="list-inside list-disc">
			{#each data.recipe.ingredients as ingredient, index (index)}
				<li>{ingredient}</li>
			{/each}
		</ul>
	</div>

	<div class="flex flex-col gap-2 text-primary">
		<h2 class="font-bold">{m['recipe.instructions']()}</h2>
		<ol class="list-inside list-decimal">
			{#each data.recipe.instructions as instruction, index (index)}
				<li>{instruction}</li>
			{/each}
		</ol>
	</div>
</section>
