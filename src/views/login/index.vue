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
    {{ msg }}

    {{ newName }}
    <a-button type="primary" @click="changeMsg">修改 </a-button>
  </div>
</template>

<script setup lang="ts">
  import { reactive, customRef, computed } from 'vue'
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
  import { useRouter } from 'vue-router'
  import { loginApi } from '@api/home'
  const router = useRouter()
  const formState = reactive({
    username: '',
    password: ''
    // remember: true
  })
  const newName = computed(() => {
    return formState.username + formState.password
  })

  function MyRef<T>(value: T) {
    return customRef((track, trigger) => {
      return {
        get() {
          track()
          return value
        },
        set(newValue: T) {
          value = newValue
          trigger()
        }
      }
    })
  }

  let msg = MyRef('小郭')
  const changeMsg = () => {
    msg.value = '老郭'
  }

  const onFinish = (values: boolean) => {
    if (values) {
      const randomStr = new Date().getTime()
      const data = {
        ...formState,
        code: '1234',
        randomStr
      }
      // request('post', '/admin/manager/login?randomStr=${randomStr}', { ...formState, code: '1234', randomStr }).then((res) => {
      loginApi(data).then((res: any) => {
        localStorage.token = res.data.access_token
        localStorage.username = res.data.username
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
