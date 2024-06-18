// import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   css: {
//     postcss: {
//       plugins: [tailwindcss()],
//     }
//   }
// })
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  server: { https: true}, // Not needed for Vite 5+
  define: {
    'process.env': process.env
  },
  plugins: [ mkcert(),
    react({
    include: "**/*.tsx",
  }), ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    }
  }
})