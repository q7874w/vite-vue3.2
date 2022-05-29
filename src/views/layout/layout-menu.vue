<template>
  <a-layout-sider class="sider">
    <div class="logo">12312312</div>
    <a-menu v-model:selectedKeys="selectedKeys1" theme="dark" mode="inline" :style="{ lineHeight: '64px' }">
      <a-menu-item key="1">nav 1</a-menu-item>
      <a-menu-item key="2">nav 2</a-menu-item>
      <a-menu-item key="3">nav 3</a-menu-item>
      <a-sub-menu key="sub2">
        <template #title>Navigation Two</template>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import request from '../../utils/request'
  const selectedKeys1 = ref<String[]>(['1'])
  const getMenuList = () => {
    request('get', '/admin/rest/tenant/account/list').then((res) => {
      console.log(res)
    })
  }
  getMenuList()
</script>

<style scoped lang="less">
  .sider {
    width: 220px;
    height: 100vh;
    background-color: #fff;
    border-right: 1px solid #d9d9d9;
  }
</style>
