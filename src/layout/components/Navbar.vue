<template>
  <div class="nav">
    <div class="logo">
      <img alt="YiNuo logo" src="@/assets/images/logo.png" />
    </div>
    <div class="nav-center">
      consoleconsole
    </div>
    <router-link to="/messages" tag="div" class="nav-message">
      <i class="el-icon-message"></i> <span>18</span>
    </router-link>
    <router-link to="/alerts" tag="div" class="nav-message">
      <i class="el-icon-close-notification"></i>
      <span>1</span>
    </router-link>
    <div class="nav-user-info">
      <UserInfo :userInfo="userInfo"></UserInfo>
    </div>
    <!--切换中英文-->
    <span class="header-toos">
      <LanSelect></LanSelect>
      <!-- 全屏-->
      <ScreenFull style="margin-left: 10px;"></ScreenFull>
    </span>
  </div>
</template>

<script>
import LanSelect from "@/components/LangSelect/index";
import ScreenFull from "@/components/ScreenFull/index";
import UserInfo from "@/components/UserInfo/UserInfo";
export default {
  name: "Header",
  data() {
    return { isShow: false, userInfo: {} };
  },
  components: {
    LanSelect,
    ScreenFull,
    UserInfo
  },
  mounted() {
    this.userInfo = this.$store.getters.userInfo;
  },
  methods: {
    async reLogin() {
      await this.$store.dispatch("user/logout");
      console.log("logout");
      this.$router.push(`/login`);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/style/mixin.scss";
.nav {
  height: 70px;
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
    align-items: flex-end;
    justify-content: space-between;
    img {
      width: 208px;
      height: 57px;
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
    height: 100%;
    padding: 0 40px;
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
    border-right: 2px solid #5892db;
  }
  .header-toos {
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
