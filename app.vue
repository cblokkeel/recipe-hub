<script setup lang="ts">
const links = [
    {
        label: "Recipes",
        icon: "i-heroicons-book-open",
        to: "/recipes"
    }, 
    {
        label: "Grocery list",
        icon: "i-heroicons-building-storefront",
        to: "/grocery"
    },
]
</script>


<template>

    <UHeader :links="links">
        <template #logo>
            RecipeHub
        </template>

        <template #right>
            <UButton variant="soft" color="red">
                Logout
            </UButton>
        </template>
    </UHeader>

    <UMain>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UMain>

    <UFooter />
</template>
