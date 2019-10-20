<template>
  <MyTable table_name="group">
      <el-table-column show-overflow-tooltip
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="name"
        label="分组名称">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="description"
        label="备注">
      </el-table-column>
  </MyTable>
</template>

<script>
  export default {
      name: 'group_list'
  }
</script>
<style scoped>

</style>
