<template>
  <div>
    <div>404 not found</div>
    <el-button @click="goToHome">返回首页</el-button>
  </div>
</template>

<script>
export default {
  name: "404",
  methods: {
    goToHome() {
      console.log("返回首页");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped></style>
