<script lang="ts">
	import type { Recipe } from '../../convex/recipe';
	import placeholder from '$lib/assets/placeholder.png';

	type Props = {
		recipe: Recipe;
	};

	let { recipe }: Props = $props();
</script>

<div class="flex cursor-pointer flex-col gap-2">
	<!-- TODO: replace with recipe image when implemented -->
	<img src={placeholder} alt={recipe.name} class="h-36 w-full rounded-lg object-cover" />
	<p class="text-accent">{recipe.name}</p>
</div>
