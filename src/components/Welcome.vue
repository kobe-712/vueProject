<template>
  <div>
    <h3>欢迎您 {{ username }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录名
      username: ''
    }
  },
  created() {
    this.showUsername()
  },
  components: {},
  methods: {
    showUsername() {
      // 拿到存储的user，将其赋值给data里的变量
      this.username = window.sessionStorage.getItem('user')
    }
  }
}
</script>

<style scoped lang="scss"></style>
