<template>
  <div class="side_nav_menu">
    <div class="sub-collapse-button" @click="collapseSwich">
      <i
        :class="[isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left']"
      ></i>
    </div>
    <el-menu
      :default-active="$route.name"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#242D3C"
      text-color="#fff"
      active-text-color="#5791D1"
      :collapse="isCollapse"
      @select="menuSelect"
    >
      <!--      <el-submenu index="alerts">-->
      <!--        <template slot="title">-->
      <!--          <i class="el-icon-location"></i>-->
      <!--          <span>Alerts</span>-->
      <!--        </template>-->
      <!--        <el-menu-item index="1-1">选项1</el-menu-item>-->
      <!--        <el-menu-item index="1-2">选项2</el-menu-item>-->
      <!--      </el-submenu>-->
      <el-menu-item index="alerts">
        <i class="el-icon-location"></i>
        <span slot="title">Alerts</span>
      </el-menu-item>
      <el-menu-item index="devices">
        <i class="el-icon-menu"></i>
        <span slot="title">Devices</span>
      </el-menu-item>
      <el-menu-item index="appuser">
        <i class="el-icon-document"></i>
        <span slot="title">APP User</span>
      </el-menu-item>
      <el-menu-item index="accounts">
        <i class="el-icon-setting"></i>
        <span slot="title">Accounts</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: true
    };
  },
  beforeMount() {
    this.getWindowHeight();
  },
  methods: {
    // 点击菜单跳转路由
    menuSelect(ev) {
      // console.log(this.$router);
      this.$router.push(`/${ev}`);
    },
    collapseSwich() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getWindowHeight() {
      this.clientHeight = window.innerHeight;
    }
  },
  watch: {
    $route(to, from) {
      console.log(to);
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    }
  }
};
</script>

<style lang="scss">
.side_nav_menu {
  background: #242d3c;
  height: 100%;
}
.el-menu-item,
.el-submenu__title {
  text-align: left !important;
  padding: 0 38px !important;
}
.el-menu--collapse {
  .el-menu-item {
    padding: 0 !important;
  }
  .el-submenu__title {
    padding: 0 20px !important;
  }
}
.el-menu-item-group {
  padding: 0 20px;
}
.el-menu-item [class^="el-icon-"],
.el-submenu [class^="el-icon-"] {
  margin-right: 10px;
}
.el-submenu .el-menu-item {
  padding: 0 75px !important;
}
.sub-collapse-button {
  color: #ffffff;
  height: 40px;
  background: #30394a;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a1a9b4;
  i {
    font-size: 18px;
  }
  &:hover {
    color: #fff;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 268px;
}
.el-menu {
  border-right: none !important;
}
</style>
