<template>
  <div class="app">
    <div class="el-col-24 out-operate">
      <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索" class="no-padding search "/>
            <div class="no-padding operate">
              <el-button
              size="mini"
              @click="handleEdit(0, '')" class=" no-margin">添加</el-button>
              <el-button
              size="mini"
              @click="handleDelete(0, 'more')" class=" no-margin">批量删除</el-button>
            </div>
    </div>
    <el-table
      border
      style="width: 100%"
      :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="配置名称">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="服务器地址">
      </el-table-column>
      <el-table-column
        prop="port"
        label="服务器端口">
      </el-table-column>
      <el-table-column
        prop="user"
        label="服务器用户">
      </el-table-column>
      <el-table-column
        prop="password"
        label="服务器密码">
      </el-table-column>
      <el-table-column
        prop="db_name"
        label="数据库名">
      </el-table-column>
      <el-table-column
        prop="description"
        label="备注">
      </el-table-column>
        <el-table-column align="left">
          <template slot="header" slot-scope="scope">
            操作
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="tabListPage">
      <div>
       <el-pagination @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="pageSizes"
                      :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
                      :total="totalCount"
                      background>
       </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
     name:'mysql_list',
     methods: {
         handleEdit(index, row) {
          this.my_edit('mysql_edit', row, this)
         },
         handleDelete(index, row) {
             this.my_del('mysql_del', row, this)
         },
         request(){
             this.my_request('mysql_list', this)
         },
         handleSizeChange(val) {
         // 改变每页显示的条数
             this.PageSize=val;
             // 注意：在改变每页显示的条数时，要将页码显示到第一页
             this.currentPage=1
         },
         handleCurrentChange(val) {
             // 改变默认的页数
             this.currentPage=val
         },
         handleSelectionChange(val){
             // 改变勾选的行
             this.multipleSelection = val
         }
       },
      data() {
        return {
            search: '',
             tableData:this.$my_table,
             // 默认显示第几页
            currentPage:this.$currentPage,
             // 总条数，根据接口获取数据长度(注意：这里不能为空)
            totalCount:this.$totalCount,
             // 个数选择器（可修改）
            pageSizes:this.$pageSizes,
             // 默认每页显示的条数（可修改）
            PageSize:this.$PageSize,
            tabledata:[{}],
            total_count:1,
            multipleSelection: []
        }
      },
      created(){
             this.request();
      },
      watch:{
          //  监视搜索栏 进行筛选
        search(){
            this.my_search(this)
        }
      }
  }
</script>
<style scoped>

</style>
