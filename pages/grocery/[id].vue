<script setup lang="ts">
import html2canvas from "html2canvas";

const route = useRoute();

const { data: grocery } = await useFetch(`/api/grocery/${route.params.id}`);

const receipt = ref<HTMLElement | null>(null);

function download() {
    if (!receipt.value) {
        return;
    }
    html2canvas(receipt.value, { scale: 2 }).then((canvas) => {
        const imageData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imageData;
        link.download = "captured-image.png";
        link.click();
    })
}
</script>

<template>
    <UPage>
        <UContainer class="flex items-center justify-center mt-8 w-full">
            <div 
                v-if="grocery"
                ref="receipt" 
                class="flex flex-col items-center p-4 w-94 text-black font-mono receipt cropped"
            >
                <h4 class="mb-2 opacity-70">{{ new Date().toLocaleString() }}</h4>
                <h5 class="font-bold text-2xl mb-4">RECIPEHUB</h5>

                <ul>
                    <li v-for="(ingredient, idx) in grocery.list" :key="idx">- {{ ingredient }}</li>
                </ul>
            </div>
        </UContainer>
    </UPage>
</template>

<style lang="scss" scoped>
</style>
