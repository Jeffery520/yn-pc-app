<template>
  <transition name="fade">
    <div class="mask-bg" @click.self="closePop" v-if="detail && detail.isShow">
      <div class="yn-alert-detail">
        <div class="alert-detail-header">
          User Profiles
          <i
            @click.self="closePop"
            class="el-icon-close"
            style="font-size: 20px;padding:0 0 0 20px;cursor: pointer;"
          ></i>
        </div>

        <div style="padding:0 30px 40px;">
          <div class="detail-header-alert">
            <svg-icon icon-class="alerts"></svg-icon> Alert:The blood pressure
            measured at 4:32 PM July 23 is higher than normal!
          </div>
          <div class="detail-content">
            <div class="detail-content-left">
              <div class="left-top">
                <div class="user-info-left">
                  <el-avatar
                    :size="110"
                    src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                  ></el-avatar>
                  <span class="user-info-name">Jeffery</span>
                </div>
                <div class="user-info-right">
                  <header>Basic Info</header>
                  <div class="artical">
                    <div class="left">
                      <div class="input-suffix">
                        <span>{{ $t("alerts.info.age") }}:</span>
                        <el-input readonly value="67"> </el-input>
                      </div>
                      <div class="input-suffix" style="margin-top:6px;">
                        <span>{{ $t("alerts.info.phone") }}:</span>
                        <el-input readonly value="13163735200"> </el-input>
                      </div>
                      <div class="input-suffix" style="margin-top:6px;">
                        <span>{{ $t("alerts.info.address") }}:</span>
                        <el-input readonly value="67"> </el-input>
                      </div>
                    </div>
                    <div class="right">
                      <div class="right-section">
                        <div class="right-section-item" style="width:80px;">
                          <span>Authorised</span><span>Personnel 1</span>
                        </div>
                        <div
                          class="right-section-item"
                          style="width:120px;margin-left: 20px;"
                        >
                          <span>Jack Nicholas</span><span>13163735200</span>
                        </div>
                        <el-button type="success">
                          <div class="right-btn">
                            <svg-icon icon-class="call"></svg-icon>
                            <span>Call</span>
                          </div>
                        </el-button>
                        <el-button type="success">
                          <div class="right-btn">
                            <svg-icon icon-class="chat"></svg-icon>
                            <span>Chat</span>
                          </div>
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="left-bottom">
                <div style="width: 640px;margin-right:20px; ">
                  <div class="left-bottom-table-header">Basic Info</div>
                  <el-table
                    :header-cell-style="tableHeaderColor"
                    :cell-style="tableCellColor"
                    :data="tableData"
                    border
                    style="width: 100%"
                  >
                    <el-table-column prop="date" label="日期" width="180">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                    <el-table-column prop="date1" label="日期" width="180">
                    </el-table-column>
                    <el-table-column prop="name1" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="address1" label="地址">
                    </el-table-column>
                    <el-table-column prop="address2" label="地址">
                    </el-table-column>
                  </el-table>
                </div>
                <div class="left-b-action">
                  <div class="action-status-bg">
                    <h1 class="section-title">Actions status</h1>
                    <template
                      ><el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option> </el-select
                    ></template>
                  </div>
                  <div class="action-status-bg" style="margin-top: 20px">
                    <h1 class="section-title">Actions status</h1>
                    <div style="margin:0 10px 10px;">
                      <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea"
                      >
                      </el-input>
                    </div>
                    <el-button type="primary"> Save </el-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="detail-content-right">
              <Chat></Chat>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Chat from "@/components/Chat";
export default {
  name: "alertInfo",
  components: { Chat },
  props: {
    detail: {
      type: Object,
      value: {}
    }
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          date1: "2016-05-03",
          name1: "王小虎",
          address1: "上海市普陀区金沙江路 1518 弄",
          address2: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  methods: {
    closePop() {
      this.$emit("closePOP");
    },
    tableCellColor() {
      return "color: #656565";
    },
    tableHeaderColor() {
      return "color: #676767";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/mixin.scss";
.mask-bg {
  @include mask-bg;
}
.section-title {
  font-size: 14px;
  color: $title-fontColor;
  font-weight: 600;
  text-align: left;
  padding-left: 20px;
}
.yn-alert-detail {
  background: #fff;
  /*padding: 30px 40px;*/
  border-radius: 8px;
  width: 1454px;
  overflow: hidden;
  box-sizing: border-box;
  color: $normal-fontColor;
  .alert-detail-header {
    color: $title-fontColor;
    @include flex-b-c;
    line-height: 40px;
    background: #ededed;
    padding: 0 20px;
    font-weight: 600;
    font-size: 14px;
  }
  .detail-header-alert {
    font-size: 18px;
    font-weight: 600;
    color: #ff0101;
    text-align: left;
    line-height: 80px;
    .svg-icon {
      margin-right: 10px;
    }
  }
  .detail-content {
    @include flex-b-c;
    align-items: flex-start;
    .detail-content-left {
      width: 980px;
      .left-top {
        height: 206px;
        margin-bottom: 20px;
        @include flex-b-c;
      }
      .left-bottom {
        @include flex-c-c;
        align-items: flex-start;
        margin-top: 20px;
      }
    }
    .detail-content-right {
      margin-left: 20px;
      flex-grow: 1;
      border: 1px solid $baseBorderColor;
    }
  }
}
.user-info-left {
  width: 174px;
  height: 100%;
  border: 1px solid $baseBorderColor;
  @include flex-c-c-c;
  .user-info-name {
    max-width: 140px;
    margin-top: 20px;
    font-size: 14px;
    font-weight: 600;
    color: $title-fontColor;
    @include text-overflow;
  }
}
.user-info-right {
  margin-left: 20px;
  flex-grow: 1;
  height: 100%;
  border: 1px solid $baseBorderColor;
  text-align: left;
  padding: 15px;
  header {
    font-size: 14px;
    font-weight: 600;
    color: $title-fontColor;
  }
  .input-suffix {
    @include flex-s-c;
    span {
      width: 60px;
      margin-right: 8px;
      text-align: right;
    }
  }
  .artical {
    @include flex-s-c;
    padding-top: 18px;
    .left {
      width: 260px;
    }
    .right {
      height: 138px;
      margin-left: 20px;
      border: 1px solid #a6a6a6;
      flex-grow: 1;
      overflow: scroll;
      .right-section {
        @include flex-c-c;
        background-color: #eeeeee;
        padding: 6px;
        margin: 5px;
      }
      .right-section-item {
        @include flex-c-c-c;
        align-items: flex-start;
      }
      .el-button {
        width: 92px;
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        padding: 0;
        background-color: #3aca75;
        border-color: #3aca75;
        border-radius: 0px;
        margin-left: 10px;
      }
      .right-btn {
        @include flex-c-c;
      }
      .svg-icon {
        color: #ffffff;
        font-size: 20px;
        margin-right: 5px;
      }
    }
  }
}
.left-bottom-table-header {
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #ddd;
  border-bottom: none;
  line-height: 56px;
  text-align: left;
  padding: 0 18px;
  color: $title-fontColor;
}
.detail-content-right,
.left-b-action {
  flex-grow: 1;
}
.action-status-bg {
  border: 1px solid $baseBorderColor;
  padding: 0 0 20px;
  .el-button {
    min-width: 120px !important;
  }
}
</style>
