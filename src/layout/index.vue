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
import { AppMain, Navbar, Sidebar } from "./components";
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
  methods: {
    // handleClickOutside() {
    //   this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/style/mixin.scss";
@import "~@/style/variables.scss";
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
