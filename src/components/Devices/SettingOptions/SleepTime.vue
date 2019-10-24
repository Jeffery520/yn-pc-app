<template>
  <el-form ref="SleepTime" :model="form" label-suffix="：" label-width="120px">
    <el-form-item class="form-inline" :label="form.startTime.name">
      <el-time-picker
        v-model="form.startTime.value"
        value-format="HH:mm:ss"
        format="HH:mm A"
        :picker-options="{
          selectableRange: '00:00:00 - 23:59:59'
        }"
      >
      </el-time-picker>
    </el-form-item>
    <span class="line-to">~~</span>
    <el-form-item class="form-inline" :label="form.endTime.name">
      <el-time-picker
        v-model="form.endTime.value"
        value-format="HH:mm:ss"
        format="HH:mm A"
        :picker-options="{
          selectableRange: form.startTime.value + ' - 23:59:59'
        }"
      >
      </el-time-picker>
    </el-form-item>
    <el-form-item :label="form.interval.name">
      <el-input type="number" v-model="form.interval.value"></el-input>
      <span class="form-unit">minutes</span>
    </el-form-item>
  </el-form>
</template>

<script>
import mixin from "@/components/Devices/SettingOptions/mixin";
export default {
  name: "SleepTime",
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
