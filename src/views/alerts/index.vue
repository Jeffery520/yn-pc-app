<template>
  <div class="alerts-bg">
    <div class="table-header-input">
      <div style="width: 600px;">
        <el-input :placeholder="$t('alerts.placeholder')" v-model="search">
          <template slot="append" style="background:#5F9DE9;">
            {{ $t("action.search") }}
          </template>
        </el-input>
      </div>
    </div>
    <el-table
      :show-header="false"
      tooltip-effect="dark"
      :row-class-name="_tabRowClassName"
      @row-click="showDetailInfo"
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
        <template slot-scope="scope">
          <i
            slot="reference"
            @click.stop="showAlertInfo(scope)"
            class="el-icon-info"
          ></i>
        </template>
      </el-table-column>
      <el-table-column prop="name" width="180"> </el-table-column>
      <el-table-column width="70" align="left">
        <template slot-scope="scope">
          <i class="el-icon-arrow-right"></i>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <Pagination
      ref="Pagination"
      :currentPage="currentPage"
      @currentChange="pageChange"
    ></Pagination>
    <!--简要Info弹窗-->
    <alertInfo
      ref="alertInfo"
      @openDetail="openDetail"
      :dataInfo="currentInfo"
    ></alertInfo>
    <!--Detail弹窗-->
    <alertDetail ref="alertDetail" :detail="currentDetail"></alertDetail>
  </div>
</template>

<script>
import mixin from "@/views/mixin";
import { getCsdn } from "@/api/user";
import Pagination from "@/components/Pagination/index.vue";
import alertInfo from "@/components/Alerts/alertInfo.vue";
import alertDetail from "@/components/Alerts/alertDetail.vue";
export default {
  name: "Alerts",
  mixins: [mixin],
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
      currentDetail: {}
    };
  },
  mounted() {
    getCsdn().then(function(response) {
      console.log("调试请求成功===============alert.vue");
    });
  },
  methods: {
    showAlertInfo({ row }) {
      this.$refs.alertInfo.infoVisible = true;
      this.currentInfo = row;
    },
    showDetailInfo(row) {
      // 显示detail弹窗
      this.$refs.alertDetail.detailVisible = true;
      this.currentDetail = row;
    },
    // 通过AlertInfo组件触发
    openDetail() {
      this.showDetailInfo(this.currentInfo);
      console.log("通过AlertInfo组件触发");
    },
    pageChange(ev) {
      console.log(ev);
      this.$refs.Pagination.currentPage = ev;
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
.alert-popover-bg {
  padding: 30px 40px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
}

.bm-view {
  width: 100%;
  height: 300px;
}
</style>
