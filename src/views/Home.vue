<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/logo.png" />-->
    <HelloWorld msg="Welcome to You" />
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      env: process.env.NODE_ENV
    };
  },
  components: {
    HelloWorld
  }
};
</script>
<style scoped lang="scss">
.home {
}
</style>
