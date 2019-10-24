<template>
  <div class="yn-pagination">
    <el-pagination
      background
      layout="total, prev, pager, next,jumper"
      :total="100"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return { currentPage: 2 };
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("currentChange", val);
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.yn-pagination {
  margin-top: 20px;
}
</style>
