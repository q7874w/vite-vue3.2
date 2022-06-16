import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'

const pathSrc = resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      dts: 'src/auto-import.d.ts',
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成，一旦生成配置文件之后，最好把enable关掉，即改成false。否则这个文件每次会在重新加载的时候重新生成，这会导致eslint有时会找不到这个文件。当需要更新配置文件的时候，再重新打开
        filepath: './.eslintrc-auto-import.json', // 生成json文件,可以不配置该项，默认就是将生成在根目录
        globalsPropValue: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': `${pathSrc}`,
      '@api': `${pathSrc}/api`,
      '@a': `${pathSrc}/api`,
      '@utils': `${pathSrc}/utils`,
      '@comp': `${pathSrc}/components`
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
    port: 8888, // 设置项目端口号
    open: false,
    cors: true, // 允许跨域
    // 代理配置
    proxy: {
      '/api': {
        target: 'http://www.ylwl.com/test', // 后台接口
        changeOrigin: true /* 允许跨域 */,
        secure: false, // 如果是https接口，需要配置这个参数
        ws: true, // websocket支持
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
