import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import * as Icons from '@ant-design/icons-vue'
// 全局组件
import { defineGlobalComponent } from '@utils/globalComponents'
import router from './router/index'
const app = createApp(App)
app.use(router)
app.use(Antd).mount('#app')

// 注册全局组件
defineGlobalComponent(app)
const icons: any = Icons
for (const i in icons) {
  app.component(i, icons[i])
}
