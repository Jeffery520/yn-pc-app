<template>
  <div class="lang-select">
    <el-dropdown placement="bottom" @command="selectLan">
      <i style="font-size: 20px;" class="el-icon-s-operation"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh-CN">中文</el-dropdown-item>
        <el-dropdown-item command="en-US">英文</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import setLang from "@/utils/setLang";
export default {
  name: "LanSelect",
  methods: {
    selectLan(language) {
      console.log(language);
      setLang(this, language);
    }
  }
};
</script>

<style scoped>
.lang-select {
  height: 50px;
  line-height: 50px;
}
</style>
