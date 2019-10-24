<template>
  <el-form ref="Reminder" :model="form" label-suffix="：" label-width="auto">
    <el-form-item class="form-inline no-label-form-item">
      <el-select v-model="form.timeCount.value" placeholder="请选择">
        <el-option
          v-for="item in timeCountOptins"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="form-inline ml20" :label="form.date.name + ' Time'">
      <el-date-picker
        v-model="form.date.value"
        type="datetime"
        format="MMM d,yyyy HH:mm A"
        value-format="timestamp"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item class="label-block-form-item">
      <div class="label-block">{{ form.content.name }}</div>
      <el-input type="textarea" v-model="form.content.value"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import mixin from "@/components/Devices/SettingOptions/mixin";
export default {
  name: "Reminder",
  mixins: [mixin],
  props: {
    form: {
      type: Object,
      value: {}
    }
  },
  data() {
    return {
      timeCountOptins: [
        { value: "1", label: "Once" },
        { value: "2", label: "Repeat" }
      ]
    };
  },
  computed: {},
  methods: {
    disabledDate(date) {
      console.log(date);
    }
  }
};
</script>

<style lang="scss">
.no-label-form-item .el-form-item__content {
  margin-left: 20px !important;
}
.ml20 {
  margin-left: 20px;
  .el-input {
    width: 260px !important;
  }
}
.label-block-form-item .el-form-item__content {
  margin-left: 20px !important;
  .label-block {
    color: #000000;
    font-size: 18px;
  }
  .el-textarea__inner {
    width: 542px;
  }
}
</style>
