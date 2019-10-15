export default {
  methods: {
    // 重置表单样式
    _tabRowClassName({ row, rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 !== 0) {
        return "yn-row-zebra-bg";
      }
    },
    _tableHeaderColor() {
      return "color: #000000;text-align:center;font-size:14px;font-weight:600;background-color: #fff;";
    }
  }
};
