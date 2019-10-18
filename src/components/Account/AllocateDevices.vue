<template>
  <el-dialog
    top="8vh"
    custom-class="add-account-dialog"
    width="1000px"
    :visible.sync="allocateDevicesVisible"
  >
    <header>
      <span></span>
      <div style="width: 600px;">
        <el-input :placeholder="$t('alerts.placeholder')" v-model="value">
          <template slot="append">{{ $t("action.search") }}</template>
        </el-input>
      </div>
      <i class="el-icon-close" @click="allocateDevicesVisible = false"></i>
    </header>
    <main>
      <el-table
        :cell-style="_tableCellColor"
        :header-cell-style="_tableHeaderColor"
        :row-class-name="_tabRowClassName"
        :data="gridData"
        height="500"
        border
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          property="date"
          :label="$t('devices.table.userId')"
        ></el-table-column>
        <el-table-column
          property="address"
          :label="$t('devices.table.userName')"
        ></el-table-column>
        <el-table-column
          property="address"
          :label="$t('devices.table.phoneNumber')"
        ></el-table-column>
        <el-table-column
          property="address"
          :label="$t('accounts.table.address')"
        ></el-table-column>

        <el-table-column
          property="address"
          :label="$t('accounts.table.modelNo')"
        ></el-table-column>
        <el-table-column
          property="address"
          :label="$t('accounts.table.accountID')"
        ></el-table-column>
        <el-table-column
          property="address"
          :label="$t('accounts.table.org')"
        ></el-table-column>
        <el-table-column
          property="address"
          :label="$t('accounts.table.IMEI')"
          label="IMEI"
        ></el-table-column>
        <el-table-column
          property="address"
          :label="$t('accounts.table.IMSI')"
          label="IMSI"
        ></el-table-column>
      </el-table>
      <div class="Pagination-bg">
        <Pagination ref="Pagination" @currentChange="pageChange"></Pagination>
        <div style="margin-top: 30px;">
          <el-button @click="allocateDevicesVisible = false">{{
            $t("action.cancel")
          }}</el-button>
          <el-button type="primary" @click="allocateDevicesVisible = false">{{
            $t("action.confirm")
          }}</el-button>
        </div>
      </div>
    </main>
  </el-dialog>
</template>

<script>
import mixin from "@/views/mixin";
import Pagination from "@/components/Pagination/index.vue";
export default {
  name: "Settings",
  mixins: [mixin],
  components: { Pagination },
  data() {
    return {
      value: "",
      allocateDevicesVisible: false,
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    // 切换页码
    pageChange(page) {
      this.$refs.Pagination.currentPage = page;
    },
    _addAccount() {
      this.gridData.push({
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      });
    },
    _tableCellColor({ columnIndex }) {
      if (columnIndex === 2) {
        return "color: #666666;text-align: center;cursor: pointer;";
      }
      // 蓝色字体
      return "color: #60b8f7;text-align: center;cursor: pointer;";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/mixin.scss";
.add-account-dialog {
  header {
    @include flex-b-c;
    height: 80px;
    i {
      font-size: 28px;
      padding: 20px 0 20px 20px;
      cursor: pointer;
    }
  }
  main {
    padding: 0 0 20px 0;
    .Pagination-bg {
      @include flex-b-c;
    }
  }
}
</style>

<style lang="scss">
.add-account-dialog {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0 20px 20px !important;
  }
}
</style>
