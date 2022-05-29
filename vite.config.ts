import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"

const pathSrc = resolve(__dirname, "src")
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": `${pathSrc}`,
    },
  },
  base: "./", // 打包路径
  server: {
    port: 4000, // 设置项目端口号
    open: false,
    cors: true, // 允许跨域
    // 代理配置
    proxy: {
      "/api": {
        target: "http://www.ylwl.com/test", // 后台接口
        changeOrigin: true /* 允许跨域 */,
        secure: false, // 如果是https接口，需要配置这个参数
        ws: true, // websocket支持
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
