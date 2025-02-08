<script setup lang="ts">
const recipeUrl = ref("");

const recipeData = ref<{
    ingredients: string[];
    instructions: string[];
} | null>(null)

const loading = ref(false);

async function handleFetchRecipe() {
    const url = recipeUrl.value;
    recipeUrl.value = "";
    loading.value = true;
    const recipe = await $fetch("/api/recipe", {
        method: "POST",
        body: {
            recipeUrl: url,
        },
    });
    loading.value = false;

    recipeData.value = recipe;
}
</script>

<template>
    <UContainer>
        <UInput v-model="recipeUrl" />
        <UButton @click="handleFetchRecipe" :disabled="loading">Ajouter recette</UButton>

        <div v-if="recipeData !== null">
            ingredients
            <div v-for="(item, idx) in recipeData.ingredients" :key="idx">{{ item }}</div>

            instructions
            <div v-for="(item, idx) in recipeData.instructions" :key="idx">{{ item }}</div>
        </div>
    </UContainer>
</template>
