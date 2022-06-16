<template>
  <div class="m-search">
    <a-input
      v-model.trim="searchValue"
      :placeholder="`请输入${$attrs.title}名称`"
      v-bind="$attrs"
      @input="input"
      @blur="search"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  type propsType = {
    modelValue: string
  }
  const props = defineProps<propsType>()
  // withDefaults(defineProps<propsType>(), {
  //   modelValue: '12'
  // })
  const emits = defineEmits(['update:modelValue', 'search'])
  const searchValue = ref<string>('')

  watch(
    () => props.modelValue,
    () => {
      searchValue.value = props.modelValue
    }
  )

  function input(e: Event) {
    // searchValue.value = (<HTMLInputElement>e.target).value
    searchValue.value = (e.target as HTMLInputElement).value
    emits('update:modelValue', searchValue.value)
  }

  function search() {
    emits('search')
  }
</script>

<style scoped lang="less">
  .m-search {
    width: 230px;
  }
</style>
