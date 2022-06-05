<template>
  <a-pagination
    :current="page.current"
    :total="parseInt(page.total)"
    show-quick-jumper
    show-size-changer
    :show-total="(total) => `共 ${page.total} 条记录`"
    @change="onChange"
  >
  </a-pagination>
</template>

<script setup>
  import { computed, defineProps } from 'vue'
  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => {
        return { current: 1, size: 10, total: 0 }
      }
    }
  })

  const page = computed(() => {
    const value = props.modelValue
    if (!value.total) value.total = 0
    return value
  })
  console.log(page, 'page')
  const onChange = (page, pageSize) => {
    // page.current = page
    console.log(page, pageSize, page.current)
  }
</script>

<style lang="scss" scoped></style>
