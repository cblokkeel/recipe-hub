<script lang="ts">
	import type { PageProps } from './$types';
	import * as m from '$lib/paraglide/messages.js';
	import placeholder from '$lib/assets/placeholder.png';

	const { data }: PageProps = $props();
</script>

<section class="flex flex-col gap-4 pb-8">
	<div class="breadcrumbs text-sm">
		<ul>
			<li class="text-accent"><a href="/">{m['recipe.breadcrumbs.my_recipes']()}</a></li>
			<li class="text-primary">{data.recipe.name}</li>
		</ul>
	</div>

	<h1 class="text-xl font-bold">{data.recipe.name}</h1>

	<!-- TODO: add recipe image when implemented -->
	<img class="h-48 w-full object-cover md:h-122" src={placeholder} alt="Recipe cover" />

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
