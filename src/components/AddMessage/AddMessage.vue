<template>
  <el-dialog
    top="7vh"
    custom-class="add-message-dialog"
    width="1380px"
    :title="$t('message.action.addMessage')"
    :visible.sync="addMessageVisible"
  >
    <el-form class="add-message-header" ref="form" :model="form" :inline="true">
      <el-form-item :label="$t('message.action.to')" label-width="70px">
        <el-select v-model="form.type">
          <el-option
            v-for="item in typeOptions"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('message.action.filtBy')">
        <el-select v-model="form.filtBy">
          <el-option
            v-for="item in filtOptions[form.type]"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <span
        style="line-height: 36px;margin-left: 20px;font-size: 18px;color: #000;"
        >{{ $t("message.action.arange") }}:
      </span>
      <el-form-item :label="$t('message.action.from')">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('message.action.to')">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">{{ $t("action.search") }}</el-button>
      </el-form-item>
    </el-form>
    <!--    表格内容-->
    <AddMessageTable></AddMessageTable>
    <!--    表格内容-->
    <footer>
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item>
          <el-select v-model="form.type">
            <el-option
              v-for="item in addMessageType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!--        <el-form-item>-->
        <!--          <el-radio-group-->
        <!--            class="message-type-radio"-->
        <!--            v-model="form.type"-->
        <!--            size="mini"-->
        <!--          >-->
        <!--            <el-radio :label="3" border style="margin-bottom: 5px;"-->
        <!--              >Once</el-radio-->
        <!--            >-->
        <!--            <el-radio :label="6" border>Repeat</el-radio>-->
        <!--          </el-radio-group>-->
        <!--        </el-form-item>-->

        <el-form-item :label="$t('message.table.repeat')">
          <el-select
            v-model="form.repeat"
            multiple
            collapse-tags
            @change="_repeatChange"
          >
            <el-option-group
              v-for="group in repeatOptions"
              :key="group.label"
              :label="group.label"
            >
              <el-option
                v-for="item in group.children"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('message.table.date')">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.table.time')">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.table.content')">
          <el-input
            type="textarea"
            v-model="form.name"
            style="width: 238px"
            :autosize="{ minRows: 2, maxRows: 2 }"
            resize="none"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-left:20px;margin-right: 0;">
          <el-button>{{ $t("action.cancel") }}</el-button>
          <el-button type="primary" style="margin-right: 0">{{
            $t("action.submit")
          }}</el-button>
        </el-form-item>
      </el-form>
    </footer>
  </el-dialog>
</template>

<script>
import AddMessageTable from "@/components/AddMessage/AddMessageTable";
export default {
  name: "AddMessage",
  components: { AddMessageTable },
  data() {
    return {
      addMessageVisible: false,
      form: {
        type: "App",
        filtBy: "",
        name: "",
        phone: "",
        repeat: []
      },
      typeOptions: [
        {
          label: "App",
          value: "App"
        },
        {
          label: "Device",
          value: "Device"
        }
      ],
      filtOptions: {
        App: ["Phone Number", "User ID", "User Name"],
        Device: [
          "User ID",
          "User Name",
          "Device's IMSI",
          "Device's IMEI",
          "Organization",
          "Area",
          "Age"
        ]
      },
      addMessageType: [
        {
          label: "Reminder",
          value: "Reminder"
        },
        {
          label: "Settings",
          value: "Settings"
        }
      ],
      repeatOptions: [
        {
          label: "Once",
          value: "Once",
          children: [
            {
              label: "Once",
              value: "Once"
            }
          ]
        },
        {
          label: "Repeat",
          value: "Repeat",
          children: [
            {
              label: "Monday",
              value: "Monday"
            },
            {
              label: "Tuesday",
              value: "Tuesday"
            },
            {
              label: "Wednesday",
              value: "Wednesday"
            },
            {
              label: "Thursday",
              value: "Thursday"
            },
            {
              label: "Friday",
              value: "Friday"
            },
            {
              label: "Saturday",
              value: "Saturday"
            },
            {
              label: "Sunday",
              value: "Sunday"
            }
          ]
        }
      ]
    };
  },
  methods: {
    _repeatChange(value) {
      // 只能二选一
      // 如果选项只有Once不作处理
      if (value.indexOf("Once") > -1 && value.length == 0) {
        return;
      }
      for (let i = 0; i < this.repeatOptions[1].children.length; i++) {
        // 如果选择Once后又选，则repeat删除Once
        if (
          value.indexOf(this.repeatOptions[1].children[i].value) > 0 &&
          value.indexOf("Once") == 0
        ) {
          value.splice(value.indexOf("Once"), 1);
          break;
        } else if (value.indexOf("Once") == value.length - 1) {
          // 如果选repeat后又选Once，则删除repeat
          this.form.repeat = ["Once"];
          break;
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/style/mixin.scss";
.add-message-header {
  .el-input {
    width: 200px !important;
  }
  .el-form-item__label {
    color: #000000;
    font-size: 18px;
  }
}
.add-message-dialog {
  footer {
    @include flex-s-c;
    background-color: #e5e5e5;
    margin-top: 20px;
    padding: 5px 30px;
    .el-form--inline {
      @include flex-s-c;
    }
    .el-form-item__label {
      color: #000000;
      font-size: 14px;
    }
    .el-form-item {
      margin-bottom: 0;
      margin-right: 20px;
    }
    .el-input {
      width: 160px !important;
    }
    .message-type-radio {
      @include flex-c-c-c;
      .el-radio {
        width: 100px;
        margin-left: 0 !important;
        margin-right: 0 !important;
        background-color: #fff;
      }
    }
  }
}
</style>
