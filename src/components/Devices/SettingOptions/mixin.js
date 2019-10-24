import { _debounce } from "@/utils/validate";
export default {
  watch: {
    // 监听form数据变化
    form: {
      deep: true,
      handler: _debounce(function(newVal) {
        this.$emit("update:form", newVal);
      })
    }
  }
};
