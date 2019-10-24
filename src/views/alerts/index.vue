<template>
  <div class="alerts-bg">
    <header>
      <div style="width: 600px;">
        <el-input :placeholder="$t('alerts.placeholder')" v-model="search">
          <template slot="append" style="background:#5F9DE9;">{{ $t("action.search") }}</template>
        </el-input>
      </div>
    </header>
    <el-table
      :header-cell-style="_tableHeaderColor"
      :cell-style="_tableCellColor"
      :show-header="false"
      tooltip-effect="dark"
      :row-class-name="_tabRowClassName"
      :data="
        tableData.filter(
          data =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column type="index" width="80" align="center"></el-table-column>
      <el-table-column prop="fMsgContent" show-overflow-tooltip>
        <template slot-scope="scope">
          <!-- 正常提示内容-->
          <span v-if="scope.row.fAlertType != 1">{{scope.row.fMsgContent}}</span>
          <!-- SOS -->
          <span v-if="scope.row.fAlertType == 1" style="font-size: 18px;color:#E65945;">{{ scope.row.fMsgContent }}</span>
          <span v-if="scope.row.fAlertType == 5" style="font-size: 18px;color:#E65945;">{{ scope.row.fBloodsugar }}</span>
          <span></span>
          <!--          姓名和日期-->
          <span>
            {{
            ` - ${scope.row.fFullname || "unknown"} - ${formatTime(
            scope.row.fAlertTime
            )}`
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column width="140">
        <template slot-scope="scope">
          <i slot="reference" @click.stop="showAlertInfo(scope)" class="el-icon-info"></i>
        </template>
      </el-table-column>
      <el-table-column prop="fAlertStaus" width="140">
        <template slot-scope="scope">
          <span v-if="scope.row.fAlertStaus == 1" style="font-size: 20px;color:#E65945;">Open</span>
          <span v-if="scope.row.fAlertStaus == 2" style="font-size: 20px;color:#E65945;">Skip</span>
          <span v-if="scope.row.fAlertStaus == 3" style="font-size: 20px;color:#38CB73;">Follow up</span>
          <span v-if="scope.row.fAlertStaus == 4" style="font-size: 20px;color:#629EE7;">Completed</span>
        </template>
      </el-table-column>
      <el-table-column width="60" align="left">
        <template slot-scope="scope">
          <i @click="showDetailInfo(scope.row)" class="el-icon-arrow-right"></i>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <Pagination ref="Pagination" :currentPage="currentPage" @currentChange="pageChange"></Pagination>
    <!--简要Info弹窗-->
    <alertInfo ref="alertInfo" @openDetail="openDetail" :dataInfo="currentInfo"></alertInfo>
    <!--Detail弹窗-->
    <alertDetail ref="alertDetail" :detail="currentDetail"></alertDetail>
  </div>
</template>

<script>
  import mixin from "@/views/mixin";
  import { formatDate } from "@/utils/validate";
  import { getCsdn } from "@/api/user";
  import { getAlertList } from "@/api/alert";
  import Pagination from "@/components/Pagination/index.vue";
  import alertInfo from "@/components/Alerts/alertInfo.vue";
  import alertDetail from "@/components/Alerts/alertDetail.vue";
  export default {
    name: "Alerts",
    mixins: [mixin],
    components: { Pagination, alertInfo, alertDetail },
    data() {
      return {
        tableData: [],
        search: "",
        currentPage: 1,
        currentInfo: {},
        currentDetail: {}
      };
    },
    mounted() {
      getAlertList()
        .then(response => {
          let { list } = response;
          console.log(response);
          this.tableData = list;
        })
        .catch(error => {
          console.log(error);
        });
      getCsdn().then(function(response) {
        console.log("getCsdn调试请求成功===============alert.vue");
      });
    },
    methods: {
      showAlertInfo({ row }) {
        this.$refs.alertInfo.infoVisible = true;
        this.currentInfo = row;
      },
      showDetailInfo(row) {
        console.log(row, "显示detail弹窗");
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
      },
      formatTime(timestamp) {
        const dateObj = formatDate(timestamp, "en");
        return `${dateObj.month} ${dateObj.day} - ${dateObj.hour < 10 ? "0" + dateObj.hour : dateObj.hour}:${
          dateObj.minute < 10 ? "0" + dateObj.minute : dateObj.minute
        } ${dateObj.ampm} `;
      }
    }
  };
</script>
<style lang="scss">
@import "@/style/mixin.scss";
.alerts-bg {
  @include table-bg;
  color: #2a2a2a;
  header {
    @include flex-e-c;
    flex-wrap: wrap;
    margin-bottom: 25px;
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
