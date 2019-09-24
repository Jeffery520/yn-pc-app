<template>
  <div id="nav">
    <!--    <img alt="Vue logo" src="../asset/logo.png" />-->
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
  export default {
    name: "Header",
    mounted(){
      console.log(this);
      this.getCsdn()
    },
    methods: {
      getCsdn(){
        this.$api.user.articles()
          .then(res=>console.log(res))
      }
    }
  }
</script>

<style scoped lang="scss">
  #nav{
    width: 100%;
    height: 50px;
    background: #333;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 100px;
      height: 50px;
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