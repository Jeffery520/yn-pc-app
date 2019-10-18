<template>
  <div class="nav">
    <div class="logo">
      <img alt="YiNuo logo" src="@/assets/images/logo.png" />
    </div>
    <div class="nav-center">
      {{ date }}
    </div>
    <router-link to="/messages" tag="div" class="nav-message">
      <i class="el-icon-message"></i> <span>18</span>
    </router-link>
    <router-link to="/alerts" tag="div" class="nav-message">
      <i class="el-icon-bell"></i>
      <span>1</span>
    </router-link>
    <!--切换中英文-->
    <span class="header-toos">
      <LanSelect></LanSelect>
    </span>
    <span class="header-toos">
      <!-- 全屏-->
      <ScreenFull></ScreenFull>
    </span>

    <div class="nav-user-info">
      <UserInfo :userInfo="userInfo"></UserInfo>
    </div>
  </div>
</template>

<script>
import LanSelect from "@/components/LangSelect/index";
import ScreenFull from "@/components/ScreenFull/index";
import UserInfo from "@/components/UserInfo/UserInfo";
export default {
  name: "Header",
  data() {
    return {
      userInfo: {},
      date: ""
    };
  },
  components: {
    LanSelect,
    ScreenFull,
    UserInfo
  },
  mounted() {
    this.userInfo = this.$store.getters.userInfo;
    this.date = this._getDate();
    clearInterval(this.TIMER);
    this.TIMER = setInterval(() => {
      this.date = this._getDate();
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.TIMER);
  },
  methods: {
    _getDate() {
      const date = new Date();
      const ENM = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const YY = date.getFullYear();
      const MM = date.getMonth();
      const DD = date.getDate();
      const HH = date.getHours();
      const mm = date.getMinutes();
      if (this.$store.getters.language == "zh") {
        return `${YY}年${MM}月${DD}日 ${HH}:${mm} `;
      }
      return `${HH <= 12 ? "AM" : "PM"}${HH}:${mm} ${ENM[MM]} ${DD}, ${YY}`;
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
  font-size: 20px;
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
      font-size: 32px;
    }
    span {
      min-width: 26px;
      height: 26px;
      padding: 0 7px;
      box-sizing: border-box;
      background: #fd9f01;
      border-radius: 200px;
      font-size: 18px;
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .nav-user-info {
    border-right: 2px solid #5892db;
  }
  .header-toos {
    height: 100%;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    border-right: 2px solid #5892db;
  }
}
</style>
