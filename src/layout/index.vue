<template>
  <el-container>
    <el-header height="70"><Navbar></Navbar></el-header>
    <el-container>
      <el-aside width="auto"
        ><Sidebar class="sidebar-container"></Sidebar
      ></el-aside>
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
  }
};
</script>

<style scoped>
@import "../style/variables.scss";
.el-header {
  text-align: center;
  line-height: 70px;
  padding: 0;
}
.el-container {
  height: 100%;
}
.el-aside {
  text-align: center;
  height: 100%;
}

.el-main {
  text-align: center;
}
.hideSidebar {
  width: calc(100% - 54px);
}
</style>
