<template>
  <a-layout class="section">
    <layout-menu />
    <a-layout class="main">
      <a-layout-header class="header">Header</a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
  import layoutMenu from './layout-menu.vue'
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
      .content {
        background-color: rgb(242, 243, 247);
        padding: 15px;
      }
    }
  }
</style>
