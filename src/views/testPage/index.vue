<template>
  <div>
    <m-table v-model="query" :columns="columns" :table-data="tableData" :show-selection="true" @getData="getData">
    </m-table>
  </div>
</template>

<script setup>
  import MTable from '@/components/m-table.vue'
  import { getLabelApi } from '@api/home'
  import { reactive, ref } from 'vue'

  const columns = [
    {
      title: '推送班级',
      dataIndex: 'className'
    },
    {
      title: '学生',
      dataIndex: 'studentName'
    },
    {
      title: '评星',
      dataIndex: 'evaluationScore'
    },
    {
      title: '提交人',
      dataIndex: 'submitter'
    },
    {
      title: '评价时间',
      dataIndex: 'updateTime'
    },
    {
      title: '提交内容',
      dataIndex: 'evaluationContent'
    },
    {
      title: '标签名称',
      dataIndex: 'labelName'
    },
    {
      title: '操作',
      dataIndex: 'action'
    }
  ]

  const state = reactive({
    selectedRowKeys: [],
    loading: false
  })
  const query = ref({
    current: 1,
    size: 10,
    total: 0
  })
  const tableData = ref([])
  const getData = () => {
    state.loading = true
    const data = {
      ...query.value,
      businessType: 'QDFW',
      schoolAppId: '1331785024165228545',
      schoolId: '1331786156899938305'
    }
    delete data.total
    getLabelApi(data).then((res) => {
      state.loading = false
      state.selectedRowKeys = []
      tableData.value = res.data.resultData
      query.value.total = res.total
    })
  }
  getData()
</script>

<style lang="less" scoped></style>
