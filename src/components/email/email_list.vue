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
        label="邮件名称">
      </el-table-column>
      <el-table-column
        prop="subject"
        label="邮件主题">
      </el-table-column>
      <el-table-column
        prop="to_user_list"
        label="邮件接收人">
      </el-table-column>
      <el-table-column
        prop="email_method"
        label="邮件方式">
        <template slot-scope="scope">
           <el-tag type="success" effect="dark" v-if="scope.row.email_method ===1">图片</el-tag>
           <el-tag type="primary" effect="dark" v-if="scope.row.email_method ===2">附件</el-tag>
        </template>
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

</template>

<script>
  export default {
     name:'email_list',
     methods: {
         show: function (scope) {
             console.log('scope', scope)
         }
         ,
         handleEdit(index, row) {
          this.$router.push({
              name:'email_edit',
              params: row
          })
         },
         handleDelete(index, row) {
               if(row === 'more') row=this.multipleSelection;
               console.log('dell:', row);
               if(row.length === 0){
                   this.my_notify({info:'未选择数据'})
               }else {
                   this.my_del_confirm(
                       () => {
                           this.$axios.post('/api/email_del', {
                               'id': row,
                           })
                               .then(() => {
                                   this.request();
                               })
                       })
               }
         },
         request(){
          this.$axios.get('/api/email_list?user_id='+ this.$root.user_id)
              .then(res=> {
                  console.log('emails', res);
                  this.tableData = this.tabledata = res;
                  this.totalCount=this.total_count= res.length
              })
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
