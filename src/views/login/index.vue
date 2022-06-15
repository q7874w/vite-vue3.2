<template>
  <div class="container">
    <a-form :model="formState" name="normal_login" class="login-form" :label-col="{ span: 8 }" @finish="onFinish">
      <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
        <a-input v-model:value="formState.username">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
        <a-input-password v-model:value="formState.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      {{ state.name }}
      <a-form-item :wrapper-col="{ offset: 8 }">
        <a-button type="primary" html-type="submit" class="login-form-button"> 登录 </a-button>
      </a-form-item>
      <a-button type="primary" class="login-form-button" @click="changeState"> 修改 </a-button>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
  import { useRouter } from 'vue-router'
  import { ElLoginApi } from '@api/home'

  const router = useRouter()
  const formState = reactive({
    username: '',
    password: ''
    // remember: true
  })
  const state = reactive({
    name: '二伍仔'
  })
  const changeState = () => {
    state.name = '45678f'
  }

  const onFinish = (values: boolean) => {
    if (values) {
      // const randomStr = new Date().getTime()
      const data = {
        ...formState,
        imageCode: '1234'
        // randomStr
      }
      // request('post', '/admin/manager/login?randomStr=${randomStr}', { ...formState, code: '1234', randomStr }).then((res) => {
      ElLoginApi(data).then((res: any) => {
        localStorage.token = res.data.token
        localStorage.username = res.data.userName
        localStorage.menuList = JSON.stringify(res.data.menuTreeList)
        router.replace('/home')
      })
    }
  }
</script>
<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100vh;
    background-image: url('../../assets/images/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    .login-form {
      width: 400px;
      height: 300px;
      position: absolute;
      bottom: 160px;
      right: 100px;
    }
  }
</style>
