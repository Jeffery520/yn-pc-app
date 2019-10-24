<template>
  <section class="app-main">
    <BreadCrumb></BreadCrumb>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb/index.vue";

export default {
  name: "AppMain",
  components: { BreadCrumb },
  computed: {
    key() {
      return this.$route.path; // 每次都进行刷新页面
    }
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 70px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 40px;
}
</style>
