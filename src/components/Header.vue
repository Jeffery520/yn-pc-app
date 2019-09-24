<template>
  <div id="nav">
    <div class="logo">
      <img alt="YiNuo logo" src="../asset/logo.jpg" />
    </div>
    <!--    <router-link to="/">Home</router-link>-->
    <!--    <router-link to="/about">About</router-link>-->
  </div>
</template>

<script>
export default {
  name: "Header",
  mounted() {
    console.log(this);
    this.getCsdn();
  },
  methods: {
    getCsdn() {
      this.$api.user.articles().then(res => console.log(res));
    }
  }
};
</script>

<style scoped lang="scss">
#nav {
  width: 100%;
  height: 70px;
  background: #609ee9;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    width: 268px;
    height: 100%;
    padding-left: 25px;
    box-sizing: border-box;
    border-right: 2px solid #5892db;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 149px;
      height: 28px;
      display: block;
    }
  }
  a {
    margin: 0 10px;
    font-weight: bold;
    color: #42b983;
    &.router-link-exact-active {
      color: #ffffff;
    }
  }
}
</style>
