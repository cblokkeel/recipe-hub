<script setup lang="ts">
definePageMeta({
    layout: false,
});
</script>

<template>
    <UHeader>
        <template #left>
            <h1>RecipeHub</h1>
        </template>

        <template #right>
            <UButton to="/login">Start</UButton>
        </template>
    </UHeader>

    <ULandingHero
        title="TODOTITLe"
        description="TODODESC"
    >
        <ULandingLogos />
    </ULandingHero>
</template>
