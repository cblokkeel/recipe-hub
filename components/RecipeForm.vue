<script setup lang="ts">
import { z } from 'zod'
import type { Recipe } from '~/types/recipe';

const emit = defineEmits(["created"]);

const schema = z.object({
    title: z.string().min(1),
    instructions: z.string().min(1),
    ingredients: z.string().min(1),
});

const state = reactive({
    title: "",
    instructions: "",
    ingredients: "",
})

async function onSubmit() {
    const r = await $fetch<Recipe>("/api/recipe/manual", {
        method: "POST",
        body: {
            title: state.title,
            instructions: state.instructions.split("\n"),
            ingredients: state.instructions.split("\n"),
        },
    });

    emit("created", r);
}
</script>

<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Title" name="title">
            <UInput v-model="state.title">
            </UInput>
        </UFormGroup>

        <UFormGroup label="Ingredients" name="ingredients">
            <UTextarea v-model="state.ingredients">
            </UTextarea>
            <span class="text-gray-400 text-xs">Separate by line break</span>
        </UFormGroup>

        <UFormGroup label="Instructions" name="instructions">
            <UTextarea v-model="state.instructions">
            </UTextarea>
            <span class="text-gray-400 text-xs">Separate by line break</span>
        </UFormGroup>

        <UButton type="submit">
            Submit
        </UButton>
    </UForm>
</template>
