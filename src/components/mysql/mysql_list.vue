<template>
  <MyTable table_name="mysql">
        <el-table-column show-overflow-tooltip
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable=""
          prop="name"
          label="配置名称">
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable=""
          prop="ip"
          label="服务器地址">
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable=""
          prop="port"
          label="服务器端口">
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable=""
          prop="user"
          label="服务器用户">
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable=""
          prop="password"
          label="服务器密码">
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable=""
          prop="db_name"
          label="数据库名">
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable=""
          prop="description"
          label="备注">
        </el-table-column>
  </MyTable>
</template>

<script>
  export default {
      name: 'mysql_list'
  }
</script>
<style scoped>

</style>
