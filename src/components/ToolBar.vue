<template>
  <div class="tool-bar">
    <slot> </slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less">
  .tool-bar {
    display: flex;
    height: 60px;
    padding: 10px;
    margin-bottom: 8px;
    & > *:not(:first-child) {
      margin-left: 10px;
    }
    & > .margin-auto {
      margin-left: auto;
    }
    // & > * {
    //   width: 200px;
    // }
  }
</style>
