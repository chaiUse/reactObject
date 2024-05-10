import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    // eslintPlugin()
  ],
  server: {
    proxy: {
      "/exam_api": {
        // 目标服务器地址
        target: "https://zyxcl.xyz",
        // 是否跨域
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
