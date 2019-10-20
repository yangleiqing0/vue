<template>
  <MyTable table_name="report">
      <el-table-column show-overflow-tooltip
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="name"
        label="测试报告名称">
      </el-table-column>
  </MyTable>
</template>

<script>
  export default {
      name: 'report_list',
      methods:{
        sendEmail(row){
           this.$router.push({
               name:'report_email',
               params:{id:row.id}
           })
      }
  }
  }

</script>
<style scoped>

</style>
