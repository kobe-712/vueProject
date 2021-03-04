<template>
  <el-container class="home-container">
    <el-header>
      <div class="head-l">
        <img src="../assets/img/head-l.jpg" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="primary" @click="exit" class="logout-btn"
        >退出</el-button
      >
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <!-- 动态设置侧边栏宽度 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggleBtn" @click="closeBtn">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          :default-active="activePath"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409BFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <!-- 一级菜单 -->
          <!-- 一级菜单循环渲染,动态绑定每个index，因为index的值只为字符串，所以将值转为字符串 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <!-- 动态绑定class类名，拿到iconObj中的每一项数据 -->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <!-- 用index属性作为跳转地址
                 拿到数据中的path作为跳转路径 -->
            <el-menu-item
              :index="'/' + childItem.path"
              v-for="childItem in item.children"
              :key="childItem.id"
              @click="savePath('/' + childItem.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ childItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
        <!-- <router-view></router-view> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单栏数据
      menulist: [],
      // 左侧菜单栏图标数据
      // 将每个图标类名作为对象中的一个数据
      iconObj: {
        125: 'el-icon-user-solid',
        103: 'el-icon-box',
        101: 'el-icon-suitcase',
        102: 'el-icon-s-order',
        145: 'el-icon-s-platform'
      },
      // 设置侧边栏是否收起
      isCollapse: true,
      // 设置侧边栏被激活路径
      activePath: ''
    }
  },
  created() {
    // 在created生命周期函数上调用左侧菜单栏请求数据的函数
    this.getMenuList()
    // 调用存储的路径，将其赋值给activePath
    this.activePath = window.sessionStorage.getItem('savePath')
  },
  methods: {
    //   设置点击退出事件，清除token，强制跳转回登录页面
    exit() {
      window.sessionStorage.clear()
      this.$router.push('/login')
      this.$message('登录已退出')
    },
    // 调用接口获取左侧所有菜单栏数据
    // 因为返回的为一个promise对象，所以需要先解构
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      // 判断请求数据的状态，请求成功才将数据赋值给menulist
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      // console.log(res)
    },
    // 设置侧边栏收起状态
    closeBtn() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接激活状态
    savePath(savePath) {
      // 点击每个子链接时，将当前路径存储
      window.sessionStorage.setItem('savePath', savePath)
      // 重新赋值
      this.activePath = savePath
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/home.scss';
</style>
