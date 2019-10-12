<template>
  <el-form
    ref="BloodGlucose"
    :model="form"
    label-suffix="："
    label-width="120px"
  >
    <el-form-item class="form-inline" :label="form.low_limit.name">
      <el-input type="number" v-model="form.low_limit.value"></el-input>
      <span class="form-unit">mmol/L</span>
    </el-form-item>
    <el-form-item class="form-inline" :label="form.High_limit.name">
      <el-input type="number" v-model="form.High_limit.value"></el-input>
      <span class="form-unit">mmol/L</span>
    </el-form-item>
  </el-form>
</template>

<script>
import mixin from "@/components/Devices/SettingOptions/mixin";
export default {
  name: "BloodGlucose",
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
