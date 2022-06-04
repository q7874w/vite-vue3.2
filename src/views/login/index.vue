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
      <a-form-item :wrapper-col="{ offset: 8 }">
        <a-button type="primary" html-type="submit" class="login-form-button"> 登录 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
  import { reactive } from 'vue'
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
  import { useRouter } from 'vue-router'
  import { ElLoginApi } from '@api/home.ts'

  const router = useRouter()
  const formState = reactive({
    username: '',
    password: ''
    // remember: true
  })
  const onFinish = (values) => {
    if (values) {
      // const randomStr = new Date().getTime()
      const data = {
        ...formState,
        imageCode: '1234'
        // randomStr
      }
      // request('post', '/admin/manager/login?randomStr=${randomStr}', { ...formState, code: '1234', randomStr }).then((res) => {
      ElLoginApi(data).then((res) => {
        console.log(res, 'res')
        localStorage.token = res.token
        localStorage.username = res.userName
        localStorage.menuList = JSON.stringify(res.menuTreeList)
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
