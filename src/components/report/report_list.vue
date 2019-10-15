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
              @click="handleDelete(0, 'more')" class=" no-margin">批量删除</el-button>
            </div>
    </div>
    <el-table
      border
      style="width: 100%"
      :data="tableData"
      @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="测试报告名称">
        </el-table-column>
        <el-table-column align="left">
          <template slot="header" slot-scope="scope">
            操作
          </template>
          <template slot-scope="scope">
            <el-link   :underline=false  type="primary" :href="href+'/report_download?id='+scope.row.id"><el-button
              size="mini"
              >下载</el-button></el-link>
            <el-button
              size="mini"
              type="success"
              @click="sendEmail(scope.row)">邮件发送</el-button>
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
     name:'report_list',
     methods: {
         sendEmail(row){
             this.$router.push({
                 name:'report_email',
                 params:{id:row.id}
             })
         },
         handleEdit(index, row) {
          this.my_edit('report_edit', row, this)
         },
         handleDelete(index, row) {
             this.my_del('report_del', row, this)
         },
         request(){
             this.my_request('report_list', this)
         },
         handleSizeChange(val) {
         // 改变每页显示的条数
             this.PageSize=val;
             // 注意：在改变每页显示的条数时，要将页码显示到第一页
             this.currentPage=1;
             this.request()
         },
         handleCurrentChange(val) {
             // 改变默认的页数
             this.currentPage=val;
             this.request()
         },
         handleSelectionChange(val){
             // 改变勾选的行
             this.multipleSelection = val
         }
       },
      data() {
        return {
              search: '',
              href: this.$root.$api.report_list,
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
