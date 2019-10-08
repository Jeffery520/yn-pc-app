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
  name: "INDEX",
  data() {
    return {};
  },
  props: { currentPage: { type: Number, value: 2 } },
  methods: {
    handleCurrentChange(val) {
      this.$emit("currentChange", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.yn-pagination {
  margin-top: 30px;
}
</style>
