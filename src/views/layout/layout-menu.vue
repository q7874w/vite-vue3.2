<template>
  <a-layout-sider class="sider">
    <div class="logo"></div>
    <a-menu
      v-for="item in state.menuList"
      :key="item.funcName"
      v-model:selectedKeys="selectedKeys1"
      theme=""
      mode="inline"
      :style="{ lineHeight: '64px' }"
    >
      <a-sub-menu :key="item.pkId">
        <template #title><apartment-outlined />{{ item.funcName }}</template>
        <div v-for="e in item.children" :key="e.id">
          <a-menu-item :key="e.pkId" @click="routerSkip(e)"><appstore-add-outlined />{{ e.funcName }}</a-menu-item>
        </div>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
  /***
   * TODO
   * [] TS类型校验后面再加，先完成功能
   */
  import { ref, reactive } from 'vue'
  // import { getMenuListApi } from '@api/home'
  import { useRouter } from 'vue-router'

  type menuType = {
    funcName: string
    pkId: string
    path: string
    children: menuChildren[]
  }
  type menuChildren = {
    funcName: string
    pkId: string
    path: string
    id: string
    children: menuChildren[]
  }
  const router = useRouter()
  const state = reactive({
    menuList: <menuType[]>[]
  })
  state.menuList = JSON.parse(localStorage.menuList)
  const selectedKeys1 = ref([])
  // const getMenuList = () => {
  //   getMenuListApi().then((res) => {
  //     state.menuList = res.data[0].children
  //   })
  // }
  // getMenuList()

  const routerSkip = (e: menuChildren) => {
    // selectedKeys1.value = [e.pkId]
    router.push(e.path)
  }
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
