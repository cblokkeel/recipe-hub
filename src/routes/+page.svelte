<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import type { PageProps } from './$types';
	import Recipe from '$lib/recipes/Recipe.svelte';

	let { data }: PageProps = $props();
</script>

<a class="btn btn-ghost" href="/create-recipe/manual">{m['add_recipe.title']()}</a>

{#each data.recipes as recipe, index (index)}
	<Recipe {recipe} />
{/each}
