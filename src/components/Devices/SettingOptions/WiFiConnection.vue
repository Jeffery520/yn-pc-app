<template>
  <el-form
    ref="WiFiConnection"
    :model="form"
    label-suffix="："
    label-width="120px"
  >
    <el-form-item class="form-inline" :label="form.name1.name">
      <el-input v-model="form.name1.value"></el-input>
    </el-form-item>
    <span class="line-to"></span>
    <el-form-item class="form-inline" :label="form.password.name">
      <el-input
        show-password
        type="password"
        v-model="form.password.value"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import mixin from "@/components/Devices/SettingOptions/mixin";
export default {
  name: "WiFiConnection",
  mixins: [mixin],
  props: {
    form: {
      type: Object,
      value: {}
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style scoped></style>
