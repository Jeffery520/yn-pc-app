<template>
  <div class="lang-select">
    <el-dropdown placement="bottom" @command="handleSetLanguage">
      <!--      <i style="font-size: 20px;" class="el-icon-s-operation"></i>-->
      <el-row class="lang-select-box">
        <svg-icon
          class-name="lang-select-icon"
          icon-class="g-translate"
        ></svg-icon>
      </el-row>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh">中文</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "LanSelect",
  computed: {
    language() {
      return this.$store.getters.language;
    }
  },
  methods: {
    handleSetLanguage(lang) {
      if (this.language == lang) {
        return false;
      }
      this.$i18n.locale = lang;
      this.$store.dispatch("app/setLanguage", lang);
      this.$message({
        message: this.$t("messageTxt.setLangOk"),
        type: "success"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.lang-select {
  cursor: pointer;
  height: 70px;
  display: flex;
  align-items: center;
  .lang-select-box {
    height: 70px;
    display: flex;
    align-items: center;
  }
  .lang-select-icon {
    width: 30px;
    height: 30px;
    color: #ffffff;
  }
}
</style>
