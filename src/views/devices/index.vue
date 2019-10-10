<template>
  <div id="devices">
    <header>
      <div class="d-header-title">
        <span>{{ $t("devices.tableTitle") }}</span
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
        <el-table-column prop="date1" label="Adress"> </el-table-column>
        <el-table-column prop="name1" label="Model No."> </el-table-column>
        <el-table-column prop="address1" label="Org."> </el-table-column>
        <el-table-column prop="address2" label="IMEI"> </el-table-column>
        <el-table-column prop="address2" label="IMSI"> </el-table-column>
        <el-table-column prop="address2" label="SIM Status">
          <template slot-scope="scope">
            <el-dropdown placement="bottom">
              <span>下拉菜单</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column
          width="130"
          prop="address2"
          label="Subscription of Services"
        >
        </el-table-column>
        <el-table-column prop="address2" label="Authorised Personnels">
          <template slot-scope="scope">
            <el-dropdown @command="selectUser">
              <span class="el-dropdown-link">
                <span>下拉菜单</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">黄金糕</el-dropdown-item>
                <el-dropdown-item command="2">狮子头</el-dropdown-item>
                <el-dropdown-item command="add">Add a new one</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
        <el-table-column label="Alerts">
          <template slot-scope="scope">
            <i
              @click.stop="openMseeages(scope)"
              style="padding:10px;"
              class="el-icon-bell"
            ></i>
          </template>
        </el-table-column>
        <el-table-column prop="address2" label="Settings">
          <template slot-scope="scope">
            <i
              @click.stop="openSettings(scope)"
              style="padding:10px;"
              class="el-icon-setting"
            ></i>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <i style="padding:10px;" class="el-icon-arrow-right"></i>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :currentPage="currentPage"
        @currentChange="pageChange"
      ></Pagination>
    </main>

    <!-- 新增用户-->
    <el-dialog
      top="30vh"
      custom-class="add-user-dialog"
      width="600px"
      :title="$t('devices.action.addUser')"
      :visible.sync="addUserDialogVisible"
    >
      <el-form :model="form">
        <el-form-item :label="$t('devices.table.userName')" label-width="115px">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('devices.table.phoneNumber')"
          label-width="115px"
        >
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveNewUser">确 定</el-button>
      </div>
    </el-dialog>
    <!--message 弹窗-->
    <el-dialog
      top="14vh"
      custom-class="message-dialog"
      width="1300px"
      :title="$t('devices.action.addUser')"
      :visible.sync="messageDialogVisible"
    >
      <el-table
        :header-cell-style="tableHeaderColor"
        :cell-style="tableCellColor"
        :data="tableData"
        height="600"
        border
        style="width: 100%"
      >
        <el-table-column prop="date1" label="Adress"> </el-table-column>
        <el-table-column prop="name1" label="Model No."> </el-table-column>
        <el-table-column prop="address1" label="Org."> </el-table-column>
        <el-table-column prop="address2" label="IMEI"> </el-table-column>
        <el-table-column prop="address2" label="IMSI"> </el-table-column>
      </el-table>
    </el-dialog>

    <!--settings 弹窗-->
    <el-dialog
      top="14vh"
      custom-class="settings-dialog"
      width="940px"
      :title="$t('devices.action.addUser')"
      :visible.sync="settingsDialogVisible"
    >
      <Settings></Settings>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination/index.vue";
import Settings from "@/components/Settings/index.vue";
export default {
  name: "Devices",
  components: { Pagination, Settings },
  data() {
    return {
      value: "",
      currentPage: 0,
      addUserDialogVisible: false,
      messageDialogVisible: false,
      settingsDialogVisible: false,
      form: { name: "", phone: "" },
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
    tabRowClassName({ row, rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 !== 0) {
        return "warning-row";
      }
    },
    tableHeaderColor() {
      return "color: #000000;text-align:center;font-size:14px;";
    },
    tableCellColor({ columnIndex }) {
      if (columnIndex === 1 || columnIndex === 10) {
        return "color: #666666;text-align: center;cursor: pointer;";
      } else if (
        columnIndex === 11 ||
        columnIndex === 12 ||
        columnIndex === 13
      ) {
        return "color: #60b8f7;text-align: center;cursor: pointer;font-size:24px;";
      } else if (columnIndex === 14) {
        return "color: #cccccc;text-align: center;cursor: pointer;font-size:24px;";
      }
      return "color: #60b8f7;text-align: center;cursor: pointer;";
    },
    // 切换页码
    pageChange(page) {
      this.currentPage = page;
    },
    // 选择用户
    selectUser(command) {
      if (command == "add") {
        this.addUserDialogVisible = true;
      } else {
        console.log("select a User");
      }
    },
    // 新增用户
    saveNewUser() {
      this.addUserDialogVisible = false;
    },
    openMseeages({ row }) {
      console.log(row);
      this.messageDialogVisible = true;
    },
    openSettings({ row }) {
      console.log(row);
      this.settingsDialogVisible = true;
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
.add-user-dialog {
  .el-input__inner {
    width: 360px;
  }
}
</style>
