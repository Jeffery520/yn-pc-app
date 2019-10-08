<template>
  <div>
    <el-avatar icon="el-icon-user-solid" size="medium"></el-avatar>
    <p>Jeffery L</p>
    <i :class="isShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
  </div>
</template>

<script>
export default {
  name: "userInfo"
};
</script>

<style scoped></style>
