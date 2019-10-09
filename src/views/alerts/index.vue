<template>
  <div class="alerts-bg">
    <div class="table-header-input">
      <div style="width: 600px;">
        <el-input size="small" :placeholder="$t('alerts.placeholder')">
          <template slot="append"
            >搜索</template
          >
        </el-input>
      </div>
    </div>
    <el-table
      :show-header="false"
      tooltip-effect="dark"
      :row-class-name="tabRowClassName"
      :data="
        tableData.filter(
          data =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column type="index" width="60" align="right"></el-table-column>
      <el-table-column prop="date" min-width="600" show-overflow-tooltip>
      </el-table-column>
      <el-table-column width="100">
        <!-- 信息弹窗-->
        <template slot-scope="scope">
          <!--          <el-popover-->
          <!--            placement="right"-->
          <!--            width="770"-->
          <!--            trigger="click"-->
          <!--            popper-class="alert-popover-bg"-->
          <!--          >-->
          <!--          </el-popover>-->

          <i
            slot="reference"
            @click.prevent="showAlertInfo(scope)"
            class="el-icon-info"
          ></i>
        </template>
        <!-- 信息弹窗-->
      </el-table-column>
      <el-table-column prop="name" width="180"> </el-table-column>
      <el-table-column width="70" align="left">
        <template slot-scope="scope">
          <i
            @click.prevent="showDetailInfo(scope)"
            class="el-icon-arrow-right"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :currentPage="currentPage"
      @currentChange="pageChange"
    ></Pagination>

    <alertInfo
      @closePOP="closeInfoPOP"
      :v-if="currentInfo"
      :dataInfo="currentInfo"
    ></alertInfo>
    <alertDetail
      @closePOP="closeDetailPOP"
      :v-if="detail"
      :detail="detail"
    ></alertDetail>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
import alertInfo from "@/components/Alerts/alertInfo.vue";
import alertDetail from "@/components/Alerts/alertDetail.vue";
export default {
  components: { Pagination, alertInfo, alertDetail },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      search: "",
      currentPage: 1,
      currentInfo: {},
      detail: {}
    };
  },
  methods: {
    showAlertInfo({ row }) {
      this.currentInfo = row;
      this.currentInfo.isShow = true;
    },
    showDetailInfo({ row }) {
      this.detail = row;
      this.detail.isShow = true;
      console.log(row);
      console.log("showDetailInfo");
    },
    closeInfoPOP() {
      this.currentInfo = {};
    },
    closeDetailPOP() {
      console.log("closeDetailPOP");
      this.detail = {};
    },
    tabRowClassName({ row, rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 !== 0) {
        return "warning-row";
      }
    },
    pageChange(ev) {
      console.log(ev);
      this.currentPage = ev;
    }
  }
};
</script>
<style lang="scss">
@import "@/style/mixin.scss";
.alerts-bg {
  @include table-bg;
  color: #2a2a2a;
  .table-header-input {
    margin-bottom: 25px;
    @include flex-e-c;
    .el-input-group__append {
      cursor: pointer;
    }
  }
  .el-table {
    .el-table--medium td,
    .el-table--medium th {
      padding: 10px 0;
    }
    .el-icon-info {
      width: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 24px;
      color: #c1c1c1;
      cursor: pointer;
    }
    .el-icon-arrow-right {
      width: 40px;
      line-height: 40px;
      font-size: 20px;
      color: #c1c1c1;
      text-align: center;
      cursor: pointer;
    }
  }
}
.el-table__row.warning-row {
  background-color: #f9f9f9 !important;
}
.alert-popover-bg {
  padding: 30px 40px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
}
</style>
