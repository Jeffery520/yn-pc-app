<template>
  <el-dialog
    top="14vh"
    custom-class="settings-dialog"
    width="940px"
    height="600px"
    :title="$t('devices.action.settings')"
    :visible.sync="settingsVisible"
  >
    <div class="yn-set-contain">
      <div class="yn-set-left">
        <el-scrollbar
          class="page-scrollbar"
          :native="false"
          :noresize="true"
          tag="ul"
        >
          <li v-for="item in settings">
            <el-checkbox
              v-model="item.checked"
              :label="item.title"
            ></el-checkbox>
          </li>
        </el-scrollbar>
      </div>
      <div class="yn-set-right">
        <template>
          <el-form
            ref="form"
            :model="settings[currentIndex].form"
            label-suffix="："
            label-width="120px"
          >
            <el-form-item
              class="form-inline"
              :label="settings[currentIndex].form.lowLimit.name"
            >
              <el-input
                v-model="settings[currentIndex].form.lowLimit.value"
              ></el-input>
            </el-form-item>
            <span class="line-to">~~</span>
            <el-form-item
              class="form-inline"
              :label="settings[currentIndex].form.highLimit.name"
            >
              <el-input
                v-model="settings[currentIndex].form.highLimit.value"
              ></el-input>
            </el-form-item>
            <el-form-item
              class="form-inline"
              :label="settings[currentIndex].form.startTime.name"
            >
              <el-input
                v-model="settings[currentIndex].form.startTime.value"
              ></el-input>
            </el-form-item>
            <span class="line-to">~~</span>
            <el-form-item
              class="form-inline"
              :label="settings[currentIndex].form.endTime.name"
            >
              <el-input
                v-model="settings[currentIndex].form.endTime.value"
              ></el-input>
            </el-form-item>
            <el-form-item :label="settings[currentIndex].form.interval.name">
              <el-input
                v-model="settings[currentIndex].form.interval.value"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-button">
              <el-button type="primary" @click="onSubmit">Submit</el-button>
              <el-button>Cancel</el-button>
            </el-form-item>
          </el-form>
        </template>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      settingsVisible: true,
      currentIndex: 0,
      settings: [
        {
          title: "Heart Rate",
          checked: false,
          form: {
            lowLimit: { name: "Low Limit", value: 50 },
            highLimit: { name: "High Limit", value: 50 },
            startTime: { name: "Start Time", value: 50 },
            endTime: { name: "End Time", value: 50 },
            interval: { name: "Interval", value: 30 }
          }
        },
        { title: "Steps", checked: false },
        { title: "Location", checked: false },
        { title: "Tracking mode", checked: false },
        { title: "Sleep time", checked: false },
        { title: "Blood pressure", checked: false },
        { title: "Blood glucose", checked: false },
        { title: "Sedentary Reminder", checked: false },
        { title: "Fall detection", checked: false },
        { title: "Report Frequency", checked: false },
        { title: "Wifi connection", checked: false },
        { title: "Reminders", checked: false },
        { title: "SOS setting", checked: false },
        { title: "Personal Informations", checked: false }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log(this.$refs.form);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/mixin.scss";
.yn-set-contain {
  @include flex-b-c;
  align-items: flex-start;
  .yn-set-left {
    width: 245px;
    height: 560px;
    border-right: 1px solid #b5b5b5;
    padding: 20px 0;
    li {
      line-height: 36px;
      padding-left: 10px;
    }
  }
  .yn-set-right {
    flex-grow: 1;
    height: 100%;
    padding: 30px;
    .line-to {
      padding: 0 20px;
      color: #666;
    }
    .form-button {
      margin-top: 40px;
    }
  }
}
</style>

<style lang="scss">
.settings-dialog {
  .el-dialog__body {
    padding: 0 20px !important;
  }
  .el-checkbox__label {
    color: #333;
    font-size: 18px !important;
  }
  .el-checkbox__inner,
  .el-checkbox__input {
    transform: scale(1.1);
    line-height: 18px;
  }
}
.yn-set-right {
  color: #000000;
  font-size: 18px;
  .el-button {
    width: 100px;
  }
  .form-inline {
    display: inline-block;
  }
  .el-input__inner {
    width: 100px;
    font-size: 16px;
  }
  .el-form-item__label {
    color: #000000;
    font-size: 18px;
  }
}
</style>
