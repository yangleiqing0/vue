<template>
  <MyTable table_name="case" ref="child" :operate_width="'220px'" :up_class="up_class">
      <el-table-column show-overflow-tooltip sortable=""
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="group_id"
        label="用例分组" class="el-table-filter">
        <template slot-scope="scope">
         <el-tag v-for="group in $refs.child.groups" v-if="scope.row.group_id === group.id" :key="group.id">{{group.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="name"
        label="用例名称" >
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="header_id"
        label="请求头部">
        <template slot-scope="scope">
         <span v-for="header in $refs.child.headers" v-if="scope.row.header_id === header.id" :key="header.id">{{header.name}}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="url"
        label="请求接口">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="data"
        label="请求报文" min-width="100px">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="method"
        label="请求方法">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="regist_variable"
        label="注册变量">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="regular"
        label="正则匹配">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="hope_result"
        label="预期结果">
      </el-table-column>
       <el-table-column show-overflow-tooltip sortable=""
        prop="is_model"
        label="模板"
        width="49">
        <template slot-scope="scope">
          <span v-if="scope.row.is_model === 1">是</span>
          <span v-if="scope.row.is_model === 0">否</span>
        </template>
      </el-table-column>
  </MyTable>
</template>


<script>
  export default {
     name:'case_list',
      data(){
         return{
             search: '',
             up_class: 'up_style'

         }
      },
     methods: {
         test_(index, row){
             this.test_run('case_run', row, this)
         }
    }
  }
</script>
<style scoped>
.el-button+.el-button{
  margin-left: 0;
}
</style>
