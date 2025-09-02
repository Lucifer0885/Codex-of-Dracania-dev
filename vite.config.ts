import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  resolve: {
    alias: {
      "@": "/src/react/",
      "@pages": "/src/react/pages/",
      "@components": "/src/react/components/",
      "@layouts": "/src/react/layouts/",
      "@assets": "/src/react/assets/",
      "@utils": "/src/react/utils/",
      "@interfaces": "/src/react/interfaces/",
      "@context": "/src/react/context/",
      "@hooks": "/src/react/hooks/",
      "@routes": "/src/react/routes/",
    },
  },
  build: {
    outDir: "dist-react",
  },
  server: {
    port: 3055,
    strictPort: true,
  },
});

