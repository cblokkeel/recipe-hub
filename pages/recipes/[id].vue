<script setup lang="ts">
const route = useRoute();

const { id } = route.params;

const { data: recipe, status } = await useFetch(`/api/recipe/${id}`, {
    lazy: true,
    server: false,
});

const imgUrl = ref("./img_placeholder.jpg");

useSSE({
    onMessage: (msg: {
        recipe_id: string;
        newImg: string;
    }) => {
        if (msg.recipe_id === recipe.value?.id) {
            imgUrl.value = msg.newImg;
        }
    }
});

watch(recipe, () => {
    if (recipe.value && recipe.value.img) {
        imgUrl.value = recipe.value.img; 
    }
});
</script>

<template>
    <UPage v-if="status !== 'idle'">
        <UContainer v-if="recipe" class="mt-8">
            <h1 class="text-center font-bold text-2xl mb-4">{{ recipe.title }}</h1>

            <NuxtImg :src="imgUrl" :alt="`${recipe.title} cover image`" class="w-full h-96 object-cover rounded" />

            <div class="mt-4">
                <h3 class="font-semibold text-xl mb-1">Ingredients :</h3>

                <ul class="list-disc list-inside">
                    <li v-for="(ingredient) in recipe.ingredients">
                        {{ ingredient }}
                    </li>
                </ul>
            </div>

            <div class="mt-4">
                <h3 class="font-semibold text-xl mb-1">Instructions :</h3>

                <ul class="list-decimal list-inside">
                    <li v-for="(instruction) in recipe.instructions">
                        {{ instruction }}
                    </li>
                </ul>
            </div>
        </UContainer>

        <UContainer v-else class="mt-8">
            No recipes found
        </UContainer>
    </UPage>
    <UPage v-else>
        <UContainer class="mt-8">
            <div class="flex items-center justify-center w-full mb-4">
                <USkeleton class="h-8 w-[25%]" />
            </div>

            <USkeleton class="w-full h-96 mb-4" />

            <div class="flex flex-col gap-2 mb-4">
                <USkeleton class="h-6 w-[15%]" />
                <USkeleton class="h-4 w-[30%]" />
                <USkeleton class="h-4 w-[35%]" />
                <USkeleton class="h-4 w-[20%]" />
            </div>

            <div class="flex flex-col gap-2 mb-4">
                <USkeleton class="h-6 w-[15%]" />
                <USkeleton class="h-4 w-[30%]" />
                <USkeleton class="h-4 w-[35%]" />
                <USkeleton class="h-4 w-[20%]" />
            </div>
        </UContainer>
    </UPage>
</template>
