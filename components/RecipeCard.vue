<script setup lang="ts">
import type { Recipe } from '~/types/recipe';

interface Props {
    recipe: Recipe
}

const props = defineProps<Props>();
</script>

<template>
    <ULandingCard
        :title="recipe.title"
        color="primary"
        orientation="horizontal"
        class="hover:scale-[1.035] cursor-pointer"
        :to="`/recipes/${recipe.id}`"
    >
        <img
          :src="recipe.img || './img_placeholder.jpg'"
          class="w-full rounded-md w-12 h-auto"
        />
    </ULandingCard>
</template>
