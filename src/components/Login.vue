<template>
  <div class="login-content">
    <!-- 头像区域 -->
    <div class="login-box">
      <div class="head-box">
        <img src="../assets/img/head-img.jpg" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <div class="login-form">
        <el-form
          label-width="0px"
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
        >
          <!-- 用户名框 -->
          <el-form-item prop="username">
            <el-input
              prefix-icon="el-icon-user-solid"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <!-- 密码框 -->
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-suitcase"
              v-model="loginForm.password"
              type="password"
            ></el-input>
          </el-form-item>
          <!-- 按钮区 -->
          <el-form-item class="form-btn">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是表单的规则验证对象
      rules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置表单方法
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    },
    // 登录前的表单预验证
    login() {
      // 用async await解构返回的promise对象
      this.$refs.loginFormRef.validate(async valiad => {
        if (!valiad) return
        // 当验证成功时，发送ajax请求去请求数据库中的数据
        const { data: res } = await this.$http.post('login', this.loginForm)
        // 判断返回的数据类型，设置条件语句
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功！')
        /* 将登录成功后的token，保存到客户端的sessionStorage中
             1.项目中除了登录之外的其他API接口必须在登录成功之后才能访问
             2.token只应该在当前网站处于打开期间生效，所以将token保存在sessionStorage中
        */
        console.log(res)
        window.sessionStorage.setItem('token', res.data.token)
        window.sessionStorage.setItem('user', res.data.username)
        //  通过编程式导航跳转到后台主页，路由地址是'/home'
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/assets/scss/login.scss';
</style>
