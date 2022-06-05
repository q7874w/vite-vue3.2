<template>
  <a-layout class="section">
    <layout-menu />
    <a-layout class="main">
      <layout-header></layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
  import LayoutMenu from './layout-menu.vue'
  import LayoutHeader from './layout-header.vue'
</script>

<style scoped lang="less">
  .section {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    .main {
      flex: 1;
      .header {
        background-color: #fff;
      }
    }
  }
</style>
