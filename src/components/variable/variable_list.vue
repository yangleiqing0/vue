<template>
  <MyTable table_name="variable">
        <el-table-column show-overflow-tooltip
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable=""
          prop="name"
          label="变量名称">
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable=""
          prop="value"
          label="变量的值">
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable=""
          prop="description"
          label="备注">
        </el-table-column>
  </MyTable>
</template>

<script>
  export default {
      name: 'variable_list',
      created() {
          console.log('variable_list created')
      }
  }
</script>
<style scoped>

</style>
