<template>
  <el-form
    ref="SOSsettings"
    :model="form"
    label-suffix="："
    label-width="120px"
  >
    <el-form-item
      v-for="item in form.phoneList"
      :label="item.name"
      :key="item.name"
      class="phone-width"
    >
      <el-input v-model="item.value"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import mixin from "@/components/Devices/SettingOptions/mixin";
export default {
  name: "SOSsettings",
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

<style lang="scss">
.phone-width {
  .el-input {
    width: 200px !important;
  }
}
</style>
