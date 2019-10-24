<template>
  <el-form
    ref="BloodPressure"
    :model="form"
    label-suffix="："
    label-width="150px"
  >
    <el-form-item class="form-inline" :label="form.SYS_low_limit.name">
      <el-input type="number" v-model="form.SYS_low_limit.value"></el-input>
      <span class="form-unit">mmHg</span>
    </el-form-item>
    <el-form-item class="form-inline " :label="form.SYS_high_limit.name">
      <el-input type="number" v-model="form.SYS_high_limit.value"></el-input>
      <span class="form-unit">mmHg</span>
    </el-form-item>
    <div class="form-inline-padding"></div>
    <el-form-item class="form-inline" :label="form.DIA_low_limit.name">
      <el-input type="number" v-model="form.DIA_low_limit.value"></el-input>
      <span class="form-unit">mmHg</span>
    </el-form-item>
    <el-form-item class="form-inline" :label="form.DIA_high_limit.name">
      <el-input type="number" v-model="form.DIA_high_limit.value"></el-input>
      <span class="form-unit">mmHg</span>
    </el-form-item>
  </el-form>
</template>

<script>
import mixin from "@/components/Devices/SettingOptions/mixin";
export default {
  name: "BloodPressure",
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
  computed: {}
};
</script>

<style scoped>
.form-inline-padding {
  height: 20px;
}
</style>
