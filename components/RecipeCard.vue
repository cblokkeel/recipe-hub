<script setup lang="ts">
import type { Recipe } from '~/types/recipe';

interface Props {
    recipe: Recipe
}

const props = defineProps<Props>();
</script>

<template>
    <UPageCard :title="recipe.title" :to="`/recipes/${recipe.id}`">
        
    </UPageCard>
</template>
