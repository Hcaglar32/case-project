import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/case-project/", // Proje adı burada ayarlandı

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias kullanımı
    },
  },
});
