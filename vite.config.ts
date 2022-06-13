import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const pathSrc = resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': `${pathSrc}`,
      '@api': `${pathSrc}/api`,
      '@utils': `${pathSrc}/utils`
    }
  },
  base: './', // 打包路径
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#5439C8',
          'text-color': '#333',
          'font-family': 'Avenir, Helvetica, Arial, sans-serif;'
        },
        javascriptEnabled: true
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8000, // 设置项目端口号
    open: false,
    cors: true, // 允许跨域
    // 代理配置
    proxy: {
      '/api': {
        target: 'https://temp.elianzhixiao.com/gateway', // 后台接口
        changeOrigin: true /* 允许跨域 */,
        secure: false, // 如果是https接口，需要配置这个参数
        ws: true, // websocket支持
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
