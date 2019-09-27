<template>
  <div id="app">
    <!--    <Layout></Layout>-->
    <!--    <Header></Header>-->
    <!--    <SideNavMenu></SideNavMenu>-->
    <!--    <transition name="fade">-->
    <!--      <router-view />-->
    <!--    </transition>-->
    <Login></Login>
  </div>
</template>
<script>
// import Layout from "@/components/Layout.vue";
import Login from "@/views/Login.vue";
export default {
  components: {
    // Layout,
    Login
  }
};
</script>
<style lang="scss">
html,
body {
  min-width: 1080px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
</style>
