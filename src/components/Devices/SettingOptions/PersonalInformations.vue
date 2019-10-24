<template>
  <el-form
    ref="PersonalInformations"
    :model="form"
    label-suffix="："
    label-width="160px"
  >
    <el-form-item :label="form.user_name.name" class="w200">
      <el-input v-model="form.user_name.value"></el-input>
    </el-form-item>
    <el-form-item :label="form.age.name" class="w100">
      <el-input type="number" v-model="form.age.value"></el-input>
    </el-form-item>
    <el-form-item :label="form.gender.name" class="w100">
      <el-select v-model="form.gender.value">
        <el-option
          v-for="item in gender"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item type="number" :label="form.phone_number.name" class="w200">
      <el-input v-model="form.phone_number.value"></el-input>
    </el-form-item>
    <el-form-item :label="form.adress.name" class="user-info-width">
      <el-input v-model="form.adress.value"></el-input>
    </el-form-item>
    <el-form-item :label="form.organization.name" class="user-info-width">
      <el-input v-model="form.organization.value"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import mixin from "@/components/Devices/SettingOptions/mixin";
export default {
  name: "PersonalInformations",
  mixins: [mixin],
  props: {
    form: {
      type: Object,
      value: {}
    }
  },
  data() {
    return { gender: ["Male", "Female"] };
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
.user-info-width {
  .el-input {
    width: 400px !important;
  }
}
.w100 {
  .el-input {
    width: 100px !important;
  }
}
.w200 {
  .el-input {
    width: 200px !important;
  }
}
</style>
