<template>
  <div class="application">
    <tool-bar>
      <m-search v-model="state.query.name" title="应用" @search="getData" />
      <a-button type="primary" @click="addApplication">新增应用</a-button>
    </tool-bar>
    <m-table
      v-model="state.page"
      :columns="columns"
      :table-data="state.tableData"
      :selected-row-keys="state.selectedRowKeys"
      :show-selection="true"
      @getData="getData"
      @selectChange="selectChange"
    >
      <template #enabled="{ record }">
        {{ record.enabled == '0' ? '未启用' : '启用' }}
      </template>
      <template #action="{ record }">
        <a @click="() => handleChangeStatus(record)">{{ record.enabled == 1 ? '禁用' : '启用' }}</a>
        <a @click="() => handleEdit(record)"> 查看 </a>
        <a @click="() => handleDelete(record)"> 删除 </a>
      </template>
    </m-table>
  </div>
</template>

<script setup lang="ts">
  import { getApplicationApi } from '@/api/home'
  const columns = [
    { title: '应用名称', dataIndex: 'name' },
    { title: '有效期(天)', dataIndex: 'day' },
    { title: '账号数量', dataIndex: 'accountNum' },
    { title: '创建人', dataIndex: 'createBy' },
    { title: '是否启用', dataIndex: 'enabled', scopedSlots: { customRender: 'enabled' } },
    { title: '创建时间', dataIndex: 'createTime' },
    {
      title: '操作',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' },
      width: '180px'
    }
  ]
  const state = reactive({
    page: { page: 1, pageSize: 10 },
    query: { name: '' },
    tableData: {
      records: []
    },
    selectedRowKeys: <string[]>[]
  })

  const addApplication = () => {}

  const getData = () => {
    const data = {
      ...state.page,
      ...state.query
    }
    getApplicationApi(data).then((res: any) => {
      state.tableData = res.data
    })
  }
  getData()

  function selectChange(selectedRowKeys: string[]) {
    state.selectedRowKeys = selectedRowKeys
  }
  function handleChangeStatus(item: any) {
    console.log(item)
  }
  function handleEdit(item: any) {
    console.log(item)
  }
  function handleDelete(item: any) {
    console.log(item)
  }
</script>

<style scoped lang="less">
  .application {
    width: 100%;
    height: 100%;
    padding: 15px;
    background-color: #fff;
  }
</style>
