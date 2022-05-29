module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:vue/essential', 'standard', 'prettier/@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 'off', // 解决文件名必须是两个以上单词的警告
    indent: ['off', 2], // 解决缩进2个空格的问题
    'vue/no-v-model-argument': 'off' // 解决v-model不需要参数的警告
  }
}
