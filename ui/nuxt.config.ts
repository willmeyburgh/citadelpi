import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: ['citadelpi'],
    },
  },
  modules: ['@pinia/nuxt', 'shadcn-nuxt', '@nuxtjs/color-mode'],
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
  },
})
