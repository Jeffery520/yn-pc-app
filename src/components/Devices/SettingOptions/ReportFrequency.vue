<template>
  <el-form
    ref="ReportFrequency"
    :model="form"
    label-suffix="："
    label-width="120px"
  >
    <el-form-item :label="form.interval.name">
      <el-input type="number" v-model="form.interval.value"></el-input>
      <span class="form-unit">minutes</span>
    </el-form-item>
  </el-form>
</template>

<script>
import mixin from "@/components/Devices/SettingOptions/mixin";
export default {
  name: "ReportFrequency",
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

<style scoped></style>
