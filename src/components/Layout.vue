<template>
  <el-container>
    <el-header height="70"><Header></Header></el-header>
    <el-container>
      <el-aside width="auto"><SideNavMenu></SideNavMenu></el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "@/components/Header.vue";
import SideNavMenu from "@/components/SideNavMenu.vue";
export default {
  name: "layout",
  components: {
    Header,
    SideNavMenu
  }
};
</script>

<style scoped>
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
</style>
