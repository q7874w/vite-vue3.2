<template>
  <a-table
    :scroll="{ y: tableHeight }"
    :row-selection="rowSelection"
    :columns="columns"
    :data-source="tableData.records"
    :row-key="rowKey"
    :pagination="{
      current: page.current,
      total: parseInt(page.total),
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: () => `共 ${page.total} 条记录`,
      // ...props.value,
      onChange
    }"
  >
    <template #headerCell="{ column }">
      <slot v-if="column.headerSlots" :name="column.headerSlots.customRender"></slot>
    </template>
    <template #bodyCell="{ column, record }">
      <slot v-if="column.scopedSlots" :name="column.scopedSlots.customRender" :record="record"></slot>
    </template>
  </a-table>
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue'
  const emit = defineEmits(['update:modelValue', 'getData'])
  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => {
        return { current: 1, size: 10, total: 0 }
      }
    },
    showSelection: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      required: true
    },
    tableData: {
      type: Object,
      required: true
    },
    rowKey: {
      type: String,
      default: 'pkId'
    },
    tableHeight: {
      type: Number,
      default: () => window.innerHeight - 220
    }
  })
  const page = computed(() => {
    const value = props.modelValue
    if (!value.total) value.total = 0
    return value
  })
  console.log(page.value, 'page')
  const onSelectChange = (selectedRowKeys: string[]) => {
    state.selectedRowKeys = selectedRowKeys
  }

  interface stateType {
    selectedRowKeys: string[]
    loading: boolean
  }

  const state: stateType = reactive({
    selectedRowKeys: [],
    loading: false
  })
  const rowSelection = computed(() => {
    return props.showSelection ? { selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange } : null
  })
  const onChange = (current: string | number, size: string | number) => {
    emit('update:modelValue', { ...page.value, current, size })
    emit('getData')
  }
</script>

<style lang="less" scoped></style>
