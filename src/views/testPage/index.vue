<template>
  <div>
    <m-table v-model="query" :columns="columns" :table-data="tableData" :show-selection="true" @getData="getData">
      <template #name>
        <smile-outlined />
        学生姓名
      </template>
      <template #score="{ record }">
        <a-rate :value="record.evaluationScore" disabled />
      </template>
      <template #submitter="{ record }"> <smile-outlined />{{ record.submitter }} </template>
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
      dataIndex: 'studentName',
      headerSlots: { customRender: 'name' }
    },
    {
      title: '评星',
      dataIndex: 'evaluationScore',
      scopedSlots: { customRender: 'score' }
    },
    {
      title: '提交人',
      dataIndex: 'submitter',
      scopedSlots: { customRender: 'submitter' }
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
  const query = reactive({
    current: 1,
    size: 10,
    total: 0
  })
  const tableData = ref([])
  const getData = () => {
    state.loading = true
    const data = {
      ...query,
      businessType: 'QDFW',
      schoolAppId: '1331785024165228545',
      schoolId: '1331786156899938305'
    }
    delete data.total
    getLabelApi(data).then((res) => {
      state.loading = false
      state.selectedRowKeys = []
      tableData.value = res.data.resultData
      query.total = res.total
    })
  }
  getData()
</script>

<style lang="less" scoped></style>
