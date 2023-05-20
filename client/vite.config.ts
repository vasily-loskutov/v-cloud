import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@layout": path.resolve(__dirname, "./src/components/layout/index.ts"),
      "@entity": path.resolve(__dirname, "./src/components/entity/index.ts"),
      "@shared": path.resolve(__dirname, "./src/components/shared/index.ts"),
      "@redux": path.resolve(__dirname, "./src/redux/index.ts"),
      "@models": path.resolve(__dirname, "./src/models/index.ts"),
      "@services": path.resolve(__dirname, "./src/services/index.ts"),
      "@config": path.resolve(__dirname, "./src/config.json"),
      "@hooks": path.resolve(__dirname, "./src/hooks/index.ts"),
      "@utils": path.resolve(__dirname, "./src/utils/index.ts"),

    },
  },
  plugins: [react()],

})
