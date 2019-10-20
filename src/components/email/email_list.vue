<template>
  <MyTable table_name="email">
      <el-table-column show-overflow-tooltip
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="name"
        label="邮件名称">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="subject"
        label="邮件主题">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="to_user_list"
        label="邮件接收人">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="email_method"
        label="邮件方式">
        <template slot-scope="scope">
           <span v-if="scope.row.email_method ===1">图片</span>
           <span v-if="scope.row.email_method ===2">附件</span>
        </template>
      </el-table-column>
  </MyTable>
</template>

<script>
  export default {
      name: 'email_list'
  }
</script>
<style scoped>

</style>
