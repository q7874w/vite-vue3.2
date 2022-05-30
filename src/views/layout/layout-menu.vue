<template>
  <a-layout-sider class="sider">
    <div class="logo"></div>
    <a-menu
      v-for="item in state.menuList"
      :key="item.id"
      v-model:selectedKeys="selectedKeys1"
      theme=""
      mode="inline"
      :style="{ lineHeight: '64px' }"
    >
      <a-sub-menu :key="item.id">
        <template #title>{{ item.name }}</template>
        <div v-for="e in item.children" :key="e.id">
          <a-menu-item :key="e.id">{{ e.name }}</a-menu-item>
        </div>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import request from '../../utils/request'

  const state = reactive({
    menuList: []
  })
  const selectedKeys1 = ref<String[]>(['1'])
  const getMenuList = () => {
    request('get', '/admin/tool/user/admin/menu/info').then((res) => {
      state.menuList = res.data[0].children
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
    .logo {
      height: 64px;
    }
  }
  :deep(.ant-menu-sub) {
    background-color: #fff;
  }
</style>
