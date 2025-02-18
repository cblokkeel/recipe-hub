<script setup lang="ts">
const route = useRoute()

const { id } = route.params;

const { data: recipe } = useFetch(`/api/recipe/${id}`);
</script>

<template>
    <UContainer v-if="recipe" class="mt-12">
        <h1 class="text-center font-bold text-2xl">{{ recipe.title }}</h1>
        <div class="flex gap-2">
            <img :src="recipe.img" :alt="`${recipe.title} cover image`" class="w-48 h-48" />
        </div>

        <div class="mt-4">
            <h3 class="font-semibold text-xl">Ingredients</h3>

            <ul class="list-disc list-inside">
                <li v-for="(ingredient) in recipe.ingredients">
                    {{ ingredient }}
                </li>
            </ul>
        </div>

        <div class="mt-4">
            <h3 class="font-semibold text-xl">Instructions</h3>

            <ul class="list-decimal list-inside">
                <li v-for="(instruction) in recipe.instructions">
                    {{ instruction }}
                </li>
            </ul>
        </div>
    </UContainer>

    <UContainer v-else class="mt-12">
        No recipes found
    </UContainer>
</template>
