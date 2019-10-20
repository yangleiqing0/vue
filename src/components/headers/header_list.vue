<template>
  <MyTable table_name="header">
      <el-table-column show-overflow-tooltip
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="name"
        label="请求头部名称">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="value"
        label="请求头部的值">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="description"
        label="备注">
      </el-table-column>
  </MyTable>
</template>

<script>
  export default {
      name: 'header_list'
  }
</script>
<style scoped>

</style>
