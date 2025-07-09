// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  // modules: ['@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
  css: ['~/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
