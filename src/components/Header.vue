<template>
  <div class="nav">
    <div class="logo">
      <img alt="YiNuo logo" src="../assets/images/logo.jpg" />
    </div>
    <div class="nav-center">
      consoleconsole
    </div>
    <div class="nav-message">
      <i class="el-icon-message"></i>
      <span>18</span>
    </div>
    <div class="nav-message">
      <i class="el-icon-close-notification"></i>
      <span>1</span>
    </div>
    <div class="nav-user-info">
      <el-avatar icon="el-icon-user-solid" size="medium"></el-avatar>
      <p>{{ $t("title") }}</p>
      <i :class="isShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
      <!--切换中英文-->
      <div style="margin-left: 10px;"><LanSelect></LanSelect></div>
    </div>
  </div>
</template>

<script>
import LanSelect from "@/components/LanSelect";
import { articles } from "../api/user";
export default {
  name: "Header",
  data() {
    return { isShow: false };
  },
  components: { LanSelect },
  mounted() {
    this.getCsdn();
  },
  methods: {
    getCsdn() {
      articles().then(res => console.log(res));
    }
  }
};
</script>

<style scoped lang="scss">
.nav {
  height: 70px;
  line-height: 70px;
  background: $mainColor;
  box-sizing: border-box;
  color: #ffffff;
  font-size: 16px;
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
  .nav-center {
    flex-grow: 1;
    text-align: right;
    padding-right: 40px;
    border-right: 2px solid #5892db;
  }
  .nav-message {
    width: 150px;
    height: 100%;
    border-right: 2px solid #5892db;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    i {
      font-size: 24px;
    }
    span {
      min-width: 28px;
      height: 28px;
      line-height: 28px;
      padding: 0 7px;
      box-sizing: border-box;
      background: #fd9f01;
      border-radius: 200px;
      font-size: 16px;
      text-align: center;
      margin-left: 10px;
    }
  }
  .nav-user-info {
    width: 215px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    p {
      max-width: 90px;
      margin: 0 5px;
    }
    i {
      font-size: 22px;
    }
  }
}
</style>
