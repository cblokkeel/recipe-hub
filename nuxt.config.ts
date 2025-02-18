// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxt/ui", "@nuxt/image"],
    extends: ['@nuxt/ui-pro'],
    runtimeConfig: {
        MONGODB_URI: process.env.MONGODB_URI,
        BASE_URL: process.env.BASE_URL,
    },
    devServer: {
        host: "0.0.0.0",
        port: 3000,
    }
});
