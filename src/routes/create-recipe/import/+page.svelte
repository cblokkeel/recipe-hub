<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { zod } from 'sveltekit-superforms/adapters';
	import * as m from '$lib/paraglide/messages';
	import { importRecipeSchema } from '$lib/recipes/import/schema';

	let { data } = $props();

	const { form, errors, enhance, delayed } = superForm(data.form, {
		warnings: {
			duplicateId: false
		},
		validators: zod(importRecipeSchema)
	});
</script>

<form class="flex flex-col gap-8" method="POST" use:enhance>
	<fieldset class="fieldset">
		<legend class="fieldset-legend">{m['add_recipe.import.recipe_url']()}</legend>
		<input
			type="text"
			class="input"
			placeholder={m['add_recipe.import.recipe_url_placeholder']()}
			name="url"
			bind:value={$form.url}
			required
		/>
		{#if $errors.url}
			<small>{$errors.url}</small>
		{/if}
	</fieldset>

	<button disabled={$delayed} type="submit" class="btn w-fit btn-accent">
		{#if $delayed}
			<span class="loading loading-spinner"></span>
			{m['add_recipe.import.importing']()}
		{:else}
			{m['add_recipe.import.import_recipe']()}
		{/if}
	</button>
</form>
