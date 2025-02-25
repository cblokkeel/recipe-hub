<script setup lang="ts">
const { data: groceries, status } = await useFetch("/api/grocery", {
    lazy: true,
    server: false,
});
</script>

<template>
    <UPage>
        <UContainer class="mt-8">
            <div class="flex items-center justify-between mb-4">
                <h1 class="font-bold text-2xl">Grocery lists</h1>
                <UButton to="/grocery/new">Create grocery list</UButton>
            </div>

            <UPageGrid v-if="status === 'idle'">
                <USkeleton 
                    v-for="i in 10" 
                    :key="i"
                    class="-12 h-12 cropped"
                />
            </UPageGrid>

            <UPageGrid v-if="status !== 'idle'">
                <NuxtLink
                    v-for="g in groceries" 
                    :key="g.id"
                    :to="`/grocery/${g.id}`"
                    class="hover:-translate-y-1"
                >
                <div 
                    class="flex items-center justify-center receipt cropped text-black font-mono pt-2 pb-4 w-64" 
                >
                    {{ new Date().toLocaleString() }}
                </div>
                </NuxtLink>
            </UPageGrid>
        </UContainer>
    </UPage>
</template>
