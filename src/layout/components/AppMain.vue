<template>
  <section class="app-main">
    <BreadCrumb></BreadCrumb>
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb/index.vue";

export default {
  name: "AppMain",
  components: { BreadCrumb },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
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
  font-size: 12px;
  padding: 40px;
}
</style>
