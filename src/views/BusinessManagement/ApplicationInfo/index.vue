<template>
  <div class="application">
    <tool-bar>
      <a-input v-model:value="state.query.name" placeholder="请输入应用名称" />
      <a-button @click="addApplication">新增应用</a-button>
    </tool-bar>
  </div>
</template>

<script setup lang="ts">
  import ToolBar from '@/components/ToolBar.vue'
  import { reactive } from 'vue'

  import { getApplicationApi } from '@/api/home'
  const state = reactive({
    page: { page: 1, pageSize: 10 },
    query: { name: '' }
  })

  const addApplication = () => {}

  const getData = () => {
    const data = {
      ...state.page,
      ...state.query
    }
    getApplicationApi(data).then((res) => {
      console.log(res)
    })
  }
  getData()
</script>

<style scoped lang="less">
  .application {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
</style>
