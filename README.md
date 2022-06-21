<a name="duZt2"></a>
### 1、创建vite-vue项目
node版本>=12.0.0，建议升级为最近稳定版
```javascript
npm init @vitejs/app
or 
yarn create @vitejs/app
```
输入项目名称<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/10359326/1653574710108-915fa0f6-8a21-473f-b74e-352e36ee4cd0.png#clientId=ubf1d1d8f-d48a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=60&id=u866df8a7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=120&originWidth=1134&originalType=binary&ratio=1&rotation=0&showTitle=false&size=35543&status=done&style=none&taskId=uee949c3e-5e0a-459d-8911-f65e6db580b&title=&width=567)<br />选择框架，这里选vue<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/10359326/1653574742571-bb16edc3-a29a-4b5e-a13d-106555ae223b.png#clientId=ubf1d1d8f-d48a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=123&id=u4bb9f34f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=246&originWidth=1066&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34733&status=done&style=none&taskId=uee820f76-2029-41f8-8a07-32c2151974e&title=&width=533)<br />进入目录，下载依赖，启动项目
```javascript
  cd vite-vue3
  yarn
  yarn dev
```
现在一个基于vite的vue项目已经搭建好了，运行起来是不是飞一般的感觉。

<a name="MJhel"></a>
### 2、修改vite配置文件
vite配置文件在根目录下的vite.config.js，项目启动时会自动读取。<br />目前只做最基本的配置，如路径别名、端口、打包路径、代理等
```typescript
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
      '@utils': `${pathSrc}/utils` // 常用地址都可以配置到这里
    }
  },
  base: './', // 打包路径
  server: {
    port: 4000, // 设置项目端口号
    open: false,
    cors: true, // 允许跨域
    // 代理配置
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080/test', // 后台接口
        changeOrigin: true /* 允许跨域 */,
        secure: false, // 如果是https接口，需要配置这个参数
        ws: true, // websocket支持
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

```

<a name="vxonE"></a>
### 3、 路由使用官方vue-router
npm i vue-router@4<br />创建src/router/index.ts 文件，配置项目基础路由地址，在src目录下创建view用于存放页面组件。
```typescript
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    alias: '/home',
    component: () => import('../views/layout/index.vue'),
    children: []
  },
  { path: '/login', component: () => import('../views/login/index.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

```
在main.ts中挂载路由配置
```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

const app = createApp(App)
app.use(router).mount('#app')

```
<a name="jOXmO"></a>
### 4、状态管理工具 pinia
安装：
```typescript
npm install pinia -S
```
 在main.ts中引入pinia
```typescript
import {createPinia} from 'pinia'
  
app.use(createPinia())
```
使用pinia，创建stores文件夹，新建index.ts文件
```typescript
import { defineStore } from 'pinia'
import { getList } from '../server'  // 接口地址
import { RootObject,Child } from './types'
export const useStore = defineStore({
  id: 'count',
  state: () => {
    return {
      list: <RootObject>{},
      cityChildList: <Child[]>[]
    }
  },
  getters: {},
  actions: {
    async getData() {
      const result = await getList()
      this.list = result
    }
  }
})

```
调用store中的状态和方法， 直接通过store.调用。
<a name="I8gzx"></a>
### 5、UI库
公司使用antdv，安装：
```typescript
npm i ant-design-vue --save
使用element-plus的小伙伴可以使用
npm i element-plus --save
```
在main.ts中添加
```typescript
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
app.use(router).use(Antd).mount('#app')
```

<a name="HS9iN"></a>
### 6、unplugin-auto-import
组件中自动引入components api
```typescript
npm i -D  unplugin-auto-import

//  在vite.config.js中配置plugins

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
    
   // 重新启动项目 会在src下生成 auto-import.d.ts 全局ts配置文件，防止ts报错
   // 生成 .eslintrc-auto-import.json文件 阻止eslint报错
```
<a name="wQY3O"></a>
## 代码规范！！！
我认为一个成熟的前端团队要有一套适合自己团队的代码规范。随着项目越来越大越复杂，同一个项目多人开发的时候，每个人的编码习惯不同，如果没有一套代码规范，阅读其他人的代码是一件很打脑壳的事情！！！我们可以通过一些工具来约束团队成员的代码风格，不符合规范的地方编辑器会给出提示，保存的时候编辑器可以根据配置格式化代码。

目前我使用 ** Prettier + ESLint** ，使用已成熟的前端代码规范。
<a name="scPVr"></a>
### 1、Prettier配置
prettier是当下最流行的前端格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言<br />vscode 需要安装 Prettier - Code formatter插件<br />1、项目中安装，推荐本地安装： 
```typescript
npm i prettier -D
```
2、项目根目录创建.prettierrc文件，以下是我的prettier配置，可根据需要自行删减。更多配置项信息，请前往官网查看  [Prettier-Options](https://prettier.io/docs/en/options.html)
```typescript
{
  "eslintIntegration": true, //让prettier使用eslint的代码格式进行校验
  "printWidth": 120, // 大于120字符折行
  "tabWidth": 2, // 设置tabSize（缩进）
  "useTabs": false, // 缩进不使用tab，使用空格
  "semi": false, // 句尾分号
  "vueIndentScriptAndStyle": true, //是否缩进Vue文件中的<script>和<style>标记内的代码。
  "singleQuote": true,  // 单引号
  "quoteProps": "as-needed", // 当对象中的属性被引用时更改。as-needed 只在需要的地方在对象属性周围添加引号;consistent 如果一个对象中至少有一个属性需要引用，则引用所有属性;preserve 尊重对象属性中引号的输入用法。
  "bracketSpacing": true, // 在对象，数组括号与文字之间加空格
  "trailingComma": "none", // 对象和数组最后一个元素后是否加空格
  "jsxBracketSameLine": false,  // 在jsx中把'>' 是否单独放一行
  "jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
  "arrowParens": "always", // 箭头函数只有一个参数时是否加括号 avoid 能省略就省略  always 总是有括号
  "insertPragma": false, // 是否在文件顶部插入标记
  "requirePragma": false, // 是否只格式化文件顶部包含特殊注释的文件
  "proseWrap": "never", // 强制所有的散块 聚合在一行上
  "htmlWhitespaceSensitivity": "strict", // 指定全局空格敏感性; strict  所有标记周围的空格(或缺少空格)都被认为是重要的。
}
```

3、prettier配置完成后，可以使用命令格式化代码
```typescript
npx prettier --write .
or 只格式化 xxx目录下的代码
npx prettier --write xxx
```


<a name="lYatW"></a>
### 2、eslint 配置
安装
```typescript
npm i eslint -D
```
安装成功之后执行
```typescript
npx eslint --init
```
你想如何使用ESlint？<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/10359326/1653579090943-88630e8f-d282-4656-9e48-ce0bff9c53f5.png#clientId=u229536ed-871d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=81&id=uf326a941&margin=%5Bobject%20Object%5D&name=image.png&originHeight=162&originWidth=1042&originalType=binary&ratio=1&rotation=0&showTitle=false&size=52823&status=done&style=none&taskId=ua4e8b582-47d7-4fdc-9ab8-3b911f3dd2b&title=&width=521)


你的项目中使用哪种模块？ 选择ESM<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/10359326/1653579192016-efc40e98-d607-40dc-9713-d26d8c63ce7b.png#clientId=u229536ed-871d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=65&id=u14402099&margin=%5Bobject%20Object%5D&name=image.png&originHeight=130&originWidth=956&originalType=binary&ratio=1&rotation=0&showTitle=false&size=45478&status=done&style=none&taskId=u9c93c2ec-6a1f-4207-8960-5a1b360fe43&title=&width=478)<br />你的项目使用什么框架？ 选择vue<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/10359326/1653579266526-b5d64016-b401-46e7-a726-5f185f44e8d1.png#clientId=u229536ed-871d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=66&id=ua1f87d37&margin=%5Bobject%20Object%5D&name=image.png&originHeight=132&originWidth=798&originalType=binary&ratio=1&rotation=0&showTitle=false&size=24571&status=done&style=none&taskId=uf255bac7-3a49-499f-ba87-0be1e8f01d4&title=&width=399)<br />是否使用TS？ 我这里选择是<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/10359326/1653579309384-7f328894-509c-4842-8356-88bd07fd60e7.png#clientId=u229536ed-871d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=29&id=u839575c4&margin=%5Bobject%20Object%5D&name=image.png&originHeight=58&originWidth=852&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21466&status=done&style=none&taskId=u28bed95d-3708-4352-9ad5-ae8353a4f38&title=&width=426)<br />在什么环境下运行你的代码？ 浏览器和node都选<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/10359326/1653579341689-80086cf0-ffdc-419e-9c81-16a613e4bec6.png#clientId=u229536ed-871d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=54&id=ua16a079a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=108&originWidth=722&originalType=binary&ratio=1&rotation=0&showTitle=false&size=20387&status=done&style=none&taskId=u61c88f63-2ca7-40d6-b4e6-cb782904d24&title=&width=361)<br />你要怎样为你的项目定义风格，选择1，使用流行的代码风格<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/10359326/1653579369137-27dd4dbd-7b33-42d3-8212-96617b04652f.png#clientId=u229536ed-871d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=69&id=ud9f12f32&margin=%5Bobject%20Object%5D&name=image.png&originHeight=138&originWidth=1014&originalType=binary&ratio=1&rotation=0&showTitle=false&size=43383&status=done&style=none&taskId=u0b4f46ae-cda1-49e1-b280-c1bd072a699&title=&width=507)<br />之后会让我们选择使用哪种流行的风格，这里我选第二种，因为和之前的代码习惯接近<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/10359326/1653579439527-387a62a0-14d0-472b-9c7f-28d9bd7cab98.png#clientId=u229536ed-871d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=84&id=ub579306a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=168&originWidth=1034&originalType=binary&ratio=1&rotation=0&showTitle=false&size=73750&status=done&style=none&taskId=u80a188ad-9813-4758-8f0f-38fe5246e1c&title=&width=517)<br />你希望你的配置文件是什么格式，这里我选js<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/10359326/1653579548397-d1821e5d-8f67-41e1-a64c-9a8d1b3d4b55.png#clientId=u229536ed-871d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=68&id=u5ab9a229&margin=%5Bobject%20Object%5D&name=image.png&originHeight=136&originWidth=1016&originalType=binary&ratio=1&rotation=0&showTitle=false&size=26457&status=done&style=none&taskId=u8c7dea25-1ed8-4b61-b044-3657ff4fca0&title=&width=508)<br />你想现在安装他们吗？<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/10359326/1653579589588-015577ae-1d75-4b4e-9bb2-84ce292b871c.png#clientId=u229536ed-871d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=39&id=u232f34d6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=78&originWidth=910&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22210&status=done&style=none&taskId=u136a2d07-1fe4-4aa5-b4ec-30fd1cf9bc1&title=&width=455)<br />是想用哪个包管理工具？这个就看自己喜好了<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/10359326/1653579636837-6479f062-e6f1-4824-868d-18ad43b2f647.png#clientId=u229536ed-871d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=70&id=u0661009e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=140&originWidth=814&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21706&status=done&style=none&taskId=uff83b558-94a6-46ea-b08a-d1bbab58260&title=&width=407)<br />这些步骤完成会在项目根目录生成.eslintrc.js 文件，默认配置无法满足我们的需要，如果有额外的规则，可在此文件中追加。以下是我目前的配置。
```typescript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'standard',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'vue/multi-word-component-names': 'off', // 解决文件名必须是两个以上单词的警告
    indent: ['off', 2], // 解决缩进2个空格的问题
    'vue/no-v-model-argument': 'off' // 解决v-model不需要参数的警告
  }
}

```

<a name="EY5GV"></a>
### 3、commit规范
```typescript
npm install -g commitizen@4.2.4
npm i cz-customizable@6.3.0 --save-dev

在package.json中添加配置
"config": {
    "commitizen": {
      "path": "node_modules/cz-customizable"
    }
  }



```
新增配置文件  .cz-config.js
```typescript
'use strict'

module.exports = {
  types: [
    { value: 'feat', name: 'feat:     一个新的特性' },
    { value: 'fix', name: 'fix:      修复一个Bug' },
    { value: 'docs', name: 'docs:     变更的只有文档' },
    { value: 'style', name: 'style:    空格, 分号等格式修复' },
    { value: 'refactor', name: 'refactor: 代码重构，注意和特性、修复区分开' },
    { value: 'perf', name: 'perf:     提升性能' },
    { value: 'test', name: 'test:     添加一个测试' },
    { value: 'chore', name: 'chore:   开发工具变动(构建、脚手架工具等)' },
    { value: 'revert', name: 'revert:   代码回退' },
    { value: 'build', name: 'build: 打包' }
  ],
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope (可选):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: '短说明:\n',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 100
}

```

此时就可以使用 git  add     git cz来执行git上传
<a name="gksHb"></a>
### 4、强制执行commit规范
安装commitlint进行格式校验
```typescript
npm install --save-dev @commitlint/config-conventional@12.1.4 @commitlint/cli@12.1.4
```
使用husky ，安装
```typescript
npm install --save-dev husky
初始化
npx husky install
```
初始化完成后根目录下生成   .husky 目录<br />导入commitlint.config.js 配置文件
```typescript
module.exports = {
  //继承的规则
  extends: ["@commitlint/config-conventional"],
  // 定火规则类型
  rules: {
    // type 类型定义，表示 git 提交的type 必须在以下类型范围内
    "type-enum": [
      2,
      "always",
      [
        "feat",//新功能 feature
        "fix", //修复 bug
        "docs", //文档注释
        "style", // 代码格式（不影响代码运行的变动）
        "refactor", //重构（既不增加新功能，也不是修复bug）
        "perf",//性能优化
        "test",//增加测试
        "chore",//构建过程或辅助工具的变动
        "revert", //回退
        "build",//打包
      ]
    ]
  },
  // subject 大小写不做校验
  "subject-case": [0]
}

```
 在package.json的script中添加指令
```typescript
    "prepare": "husky install"
```
然后执行这段指令   
```typescript
npm run prepare
执行命令添加husky  commit的配置文件呢
 npx husky add .husky/commit-msg
```
在生成的commit-msg 文件中写入
```typescript
npx --no-install commitlint --edit
```
此时强制性的commit就配置完成了，必须要符合规范的commit信息才能提交到git


