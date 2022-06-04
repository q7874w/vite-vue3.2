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
        <template #title><apartment-outlined />{{ item.name }}</template>
        <div v-for="e in item.children" :key="e.id">
          <a-menu-item :key="e.id"><appstore-add-outlined />{{ e.name }}</a-menu-item>
        </div>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
  /***
   * TODO
   * [] TS类型校验后面再加，先完成功能
   */
  import { ref, reactive } from 'vue'
  import { getMenuListApi } from '@api/home'

  const state = reactive({
    menuList: []
  })
  const selectedKeys1 = ref(['1'])
  const getMenuList = () => {
    getMenuListApi().then((res) => {
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
