<template>
  <a-layout-header class="layout-header">
    <menu-fold-outlined v-if="showHamburg" @click="changeHamburg" />
    <menu-unfold-outlined v-else @click="changeHamburg" />

    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
        <span v-if="index === breadcrumbList.length - 1" class="no-redirect">{{ item.name }}</span>
        <span v-else class="redirect" @click="handleRedirect(item.path)">{{ item.name }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </a-layout-header>
</template>

<script setup lang="ts">
  import { ref, watch, reactive } from 'vue'
  import { useRoute, useRouter, RouteLocationMatched } from 'vue-router'

  const route = useRoute()
  const router = useRouter()

  const showHamburg = ref(true)
  const changeHamburg = () => {
    showHamburg.value = !showHamburg.value
  }

  let breadcrumbList: RouteLocationMatched[] = reactive([])
  const initBreadcrumbList = () => {
    breadcrumbList = route.matched
  }
  watch(
    route,
    () => {
      initBreadcrumbList()
    },
    { deep: true, immediate: true }
  )

  const handleRedirect = (path: string) => {
    router.push(path)
  }
</script>

<style lang="less" scoped>
  .layout-header {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    padding: 0 20px;
    display: flex;
    line-height: 64px;
    justify-content: flex-start;
    align-items: center;
    :deep(.anticon) {
      font-size: 24px;
    }
    & > * {
      margin-right: 12px;
    }
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
    .redirect {
      color: #999;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        color: #5439c8;
      }
    }
  }
</style>
