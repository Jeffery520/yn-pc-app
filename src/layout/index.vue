<template>
  <el-container :class="classObj">
    <el-header height="70"><Navbar></Navbar></el-header>
    <el-container>
      <el-aside width="auto"><Sidebar class="sidebar-container"/></el-aside>
      <el-main>
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { AppMain, Navbar, Sidebar } from "@/layout/components";
export default {
  name: "layout",
  components: {
    AppMain,
    Navbar,
    Sidebar
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
      };
    }
  },
  mounted() {
    this._getUserInfo();
  },
  methods: {
    _getUserInfo() {
      this.$store
        .dispatch("user/getInfo")
        .then(() => {
          console.log("获取用户信息成功");
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message: "Get user information failed please try again!",
            type: "error"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  text-align: center;
  line-height: 70px;
  padding: 0;
}
.el-container {
  height: 100%;
}
.el-aside {
  height: 100%;
}

.el-main {
  text-align: center;
  padding: 0;
}
</style>
