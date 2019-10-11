<template>
  <el-dialog
    top="14vh"
    custom-class="settings-dialog"
    width="940px"
    :title="$t('devices.action.settings')"
    :visible.sync="settingsVisible"
  >
    setting
  </el-dialog>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      settingsVisible: false
    };
  }
};
</script>

<style scoped></style>
