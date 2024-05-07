import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
});
