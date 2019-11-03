<template>
  <MyTable table_name="job">
      <el-table-column show-overflow-tooltip
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="name"
        label="任务名称">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="description"
        label="任务备注">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="cron"
        label="任务cron">
      </el-table-column>
  </MyTable>
</template>

<script>
  export default {
      name: 'job_list'
  }
</script>
<style scoped>

</style>
