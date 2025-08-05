<script lang="ts">
	import type { Recipe } from '../../convex/recipe';

	type Props = {
		recipe: Recipe;
	};

	let { recipe }: Props = $props();
</script>

<div>
	{recipe.name}
</div>
