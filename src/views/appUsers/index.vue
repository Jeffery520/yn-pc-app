<template>
  <div id="devices">
    <header>
      <div class="d-header-title">
        <span>{{ $t("appUsers.tableTitle") }}</span
        ><span>4,590</span>
      </div>
      <div style="width: 500px;">
        <el-input
          size="small"
          :placeholder="$t('alerts.placeholder')"
          v-model="value"
        >
          <template slot="append"
            >搜索</template
          >
        </el-input>
      </div>
    </header>
    <main>
      <el-table
        :header-cell-style="tableHeaderColor"
        :cell-style="tableCellColor"
        :row-class-name="tabRowClassName"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column prop="date" :label="$t('devices.table.userId')">
        </el-table-column>
        <el-table-column prop="name" :label="$t('devices.table.userName')">
        </el-table-column>
        <el-table-column
          prop="address"
          :label="$t('devices.table.phoneNumber')"
          width="114"
        >
        </el-table-column>
        <el-table-column prop="date1" label="Last Login Time">
        </el-table-column>
        <el-table-column label="Chat">
          <template slot-scope="scope">
            <svg-icon
              @click.stop="openChat(scope)"
              style="font-size: 28px;"
              icon-class="weixin-icon"
            ></svg-icon>
          </template>
        </el-table-column>
        <el-table-column label="Message">
          <template slot-scope="scope">
            <i
              @click.stop="openMseeages(scope)"
              style="padding:10px; "
              class="el-icon-message"
            ></i>
          </template>
        </el-table-column>

        <el-table-column prop="date1" label="Devices Paired">
          <el-table-column prop="address2" label="Nick Name Of The Device">
            <template slot-scope="scope">
              <el-dropdown placement="bottom">
                <span>下拉菜单</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column prop="address2" label="IMEI Of The Device">
          </el-table-column>
          <el-table-column prop="name1" label="Admin"> </el-table-column>
          <el-table-column prop="address1" label="Model"> </el-table-column>
        </el-table-column>
      </el-table>
      <Pagination
        :currentPage="currentPage"
        @currentChange="pageChange"
      ></Pagination>
    </main>
    <!--chat 弹窗-->
    <el-dialog
      :visible.sync="chatVisible"
      width="380px"
      custom-class="chat-dialog"
    >
      <Chat ref="Chat"></Chat>
    </el-dialog>
    <!--message 弹窗-->
    <Message ref="Message"></Message>
  </div>
</template>
<script>
import Chat from "@/components/Chat/index.vue";
import Message from "@/components/Devices/Message.vue";
import Pagination from "@/components/Pagination/index.vue";
export default {
  name: "Devices",
  components: { Message, Pagination, Chat },
  data() {
    return {
      chatVisible: false,
      value: "",
      currentPage: 0,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          date1: "2016-05-03",
          name1: "王小虎",
          address1: "上海市普陀区金沙江路 1518 弄",
          address2: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          date1: "2016-05-03",
          name1: "王小虎",
          address1: "上海市普陀区金沙江路 1518 弄",
          address2: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          date1: "2016-05-03",
          name1: "王小虎",
          address1: "上海市普陀区金沙江路 1518 弄",
          address2: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    // 切换页码
    pageChange(page) {
      this.currentPage = page;
    },
    // 选择用户
    selectUser(command) {
      console.log(command);
      console.log("select a User");
    },
    openChat() {
      this.chatVisible = true;
    },
    openMseeages({ row }) {
      console.log(this.$refs.Message);
      this.$refs.Message.messageVisible = true;
      this.$refs.Message.messageData = [row];
    },
    // 重置表单样式
    tabRowClassName({ row, rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 !== 0) {
        return "yn-row-zebra-bg";
      }
    },
    tableHeaderColor() {
      return "color: #000000;text-align:center;font-size:14px;font-weight:600;";
    },
    tableCellColor({ columnIndex }) {
      if (columnIndex === 1 || columnIndex === 10) {
        // 可点击文字
        return "color: #666666;text-align: center;cursor: pointer;";
      } else if (columnIndex === 4 || columnIndex === 5) {
        // 图标
        return " color: #60b8f7;text-align: center;cursor: pointer;font-size:24px;";
      } else if (columnIndex === 2 || columnIndex === 7) {
        return "color: #60b8f7;text-align: center;cursor: pointer;";
      }
      return "color: #666666;text-align: center;cursor: pointer;";
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/style/mixin.scss";
#devices {
  @include table-bg;
  header {
    @include flex-b-c;
    margin-bottom: 25px;
    .d-header-title {
      line-height: 35px;
      color: #fff;
      & > span:first-child {
        display: inline-block;
        padding: 0 20px;
        background-color: $lightColor;
        font-size: 16px;
      }
      & > span:last-child {
        display: inline-block;
        padding: 0 20px;
        background-color: $normalColor;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
  main {
    .el-dropdown-link {
      @include flex-c-c;
    }
  }
}
</style>
<style lang="scss">
.chat-dialog {
  .el-dialog__header {
    height: 40px;
    line-height: 40px;
    background-color: #ffffff !important;
    border-bottom: none !important;
  }
  .el-dialog__body {
    padding: 0 !important;
  }
  .chat-bg {
    border-top: none !important;
  }
}
</style>
