<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { tick } from 'svelte';
	import { Trash } from '@lucide/svelte';
	import * as m from '$lib/paraglide/messages';

	let { data } = $props();

	const { form, enhance } = superForm(data.form, {
		warnings: {
			duplicateId: false
		}
	});

	function updateIngredient(index: number, value: string) {
		const current = Array.isArray($form.ingredients) ? $form.ingredients : [];

		const next = current.slice();
		next[index] = value;

		$form.ingredients = next;
	}

	function addIngredient() {
		const current = Array.isArray($form.ingredients) ? $form.ingredients : [];
		$form.ingredients = [...current, ''];
	}

	function removeIngredient(index: number) {
		const current = Array.isArray($form.ingredients) ? $form.ingredients : [];
		const next = current.slice(0, index).concat(current.slice(index + 1));
		$form.ingredients = next;
	}

	function focusIngredientInput(index: number) {
		const input = document.getElementById(`ingredient-${index}`) as HTMLInputElement;
		if (input) {
			input.focus();
		}
	}

	function removeInstruction(index: number) {
		const current = Array.isArray($form.instructions) ? $form.instructions : [];
		const next = current.slice(0, index).concat(current.slice(index + 1));
		$form.instructions = next;
	}

	function updateInstruction(index: number, value: string) {
		const current = Array.isArray($form.instructions) ? $form.instructions : [];

		const next = current.slice();
		next[index] = value;

		$form.instructions = next;
	}

	function addInstruction() {
		const current = Array.isArray($form.instructions) ? $form.instructions : [];
		$form.instructions = [...current, ''];
	}

	function focusInstructionInput(index: number) {
		const input = document.getElementById(`instruction-${index}`) as HTMLInputElement;
		if (input) {
			input.focus();
		}
	}

	async function handleKeydownIngredientInput(event: KeyboardEvent, index: number) {
		if (event.key === 'Enter') {
			event.preventDefault();
			addIngredient();

			await tick();

			focusIngredientInput($form.ingredients.length - 1);
		}

		if (
			event.key === 'Backspace' &&
			$form.ingredients.length > 1 &&
			$form.ingredients[index] === ''
		) {
			removeIngredient(index);

			await tick();

			focusIngredientInput(Math.max(index - 1, 0));
		}
	}

	async function handleKeydownInstructionInput(event: KeyboardEvent, index: number) {
		if (event.key === 'Enter') {
			event.preventDefault();
			addInstruction();

			await tick();

			focusInstructionInput($form.instructions.length - 1);
		}

		if (
			event.key === 'Backspace' &&
			$form.instructions.length > 1 &&
			$form.instructions[index] === ''
		) {
			removeInstruction(index);

			await tick();

			focusInstructionInput(Math.max(index - 1, 0));
		}
	}
</script>

<form class="flex flex-col gap-8" method="POST" use:enhance>
	<fieldset class="fieldset">
		<legend class="fieldset-legend">{m['add_recipe.manual.recipe_title']()}</legend>
		<input
			type="text"
			class="input"
			placeholder={m['add_recipe.manual.recipe_placeholder']()}
			name="name"
			bind:value={$form.name}
			required
		/>

		<legend class="fieldset-legend">{m['add_recipe.manual.ingredients']()}</legend>
		{#each $form.ingredients as ingredient, index (index)}
			<div class="flex gap-2">
				<input
					id={`ingredient-${index}`}
					name="ingredients"
					type="text"
					class="input"
					placeholder="Ingredient"
					value={ingredient}
					oninput={(e) => updateIngredient(index, (e?.target as HTMLInputElement)?.value)}
					onkeydown={(e) => handleKeydownIngredientInput(e, index)}
					required={index === 0}
				/>
				<button
					disabled={$form.ingredients.length === 1}
					class="btn btn-neutral"
					type="button"
					onclick={() => removeIngredient(index)}
				>
					<Trash size="16" />
				</button>
			</div>
		{/each}
		<button class="btn mt-1 w-fit btn-soft" type="button" onclick={addIngredient}>
			{m['add_recipe.manual.add_ingredient']()}
		</button>

		<legend class="fieldset-legend">{m['add_recipe.manual.instructions']()}</legend>
		{#each $form.instructions as instruction, index (index)}
			<div class="flex gap-2">
				<input
					id={`instruction-${index}`}
					name="instructions"
					type="text"
					class="input"
					placeholder="Ingredient"
					value={instruction}
					oninput={(e) => updateInstruction(index, (e?.target as HTMLInputElement)?.value)}
					onkeydown={(e) => handleKeydownInstructionInput(e, index)}
					required={index === 0}
				/>

				<button
					disabled={$form.instructions.length === 1}
					class="btn btn-neutral"
					type="button"
					onclick={() => removeInstruction(index)}
				>
					<Trash size="16" />
				</button>
			</div>
		{/each}
		<button class="btn mt-1 w-fit btn-soft" type="button" onclick={addInstruction}>
			{m['add_recipe.manual.add_instruction']()}
		</button>

		<legend class="fieldset-legend">{m['add_recipe.manual.recipe_cover']()}</legend>
		<input type="file" class="file-input" bind:value={$form.image} />
	</fieldset>

	<button type="submit" class="btn w-fit btn-accent">{m['add_recipe.manual.add_recipe']()}</button>
</form>
