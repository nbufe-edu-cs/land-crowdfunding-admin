<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: {
    total: Number
  },
  data() {
    return {
      currentPage: 1,
      pageSizes: [10, 15, 20, 50],
      pageSize: 10
    };
  },
  methods: {
    handleSizeChange(pageSize) {
      this.$emit("pageSize", pageSize);
    },
    handleCurrentChange(currentPage) {
      this.$emit("currentPage", currentPage);
    }
  }
};
</script>
<style lang="less" scoped>
.block {
  margin-top: 20px;
}
</style>