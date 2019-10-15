<template>
  <div class="app">
    <div class="el-col-24 out-operate">
      <div  style="min-width: 500px">
        <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索 " class="no-padding search "/>
           <div class="no-padding operate">
              <el-button
              size="mini"
              @click="handleEdit(0, '')" class="no-margin top-3">添加</el-button>
               <form :action="href+'/case_upload'" method="post" enctype="multipart/form-data" style="margin-top: -6px;float: left">
                  <div class="padding-top">
                    <input type="file" id="upload_xlsx" name="upload_xlsx" class="el-button el-button--mini" style="width: 170px;padding: 2px;">
                  </div>
                  <div class="padding-top" style="margin-top: 8px;padding-right: 4px">
                      <input type="submit" value="上传" class="el-button el-button--mini">
                  </div>
              </form>
              <el-link   :underline=false  type="primary" :href="href+'/case_download'" style="margin-top: 2px"><el-button
              size="mini"
              >下载</el-button></el-link>
              <el-button
              size="mini"
              @click="handleDelete(0, 'more')" class=" no-margin top-3">批量删除</el-button>
            </div>
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
        prop="group_id"
        label="用例分组">
        <template slot-scope="scope">
         <span v-for="group in groups" v-if="scope.row.group_id === group.id">{{group.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="用例名称">
      </el-table-column>
      <el-table-column
        prop="header_id"
        label="请求头部">
        <template slot-scope="scope">
         <span v-for="header in headers" v-if="scope.row.header_id === header.id">{{header.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="url"
        label="请求接口">
      </el-table-column>
      <el-table-column
        prop="data"
        label="请求报文">
      </el-table-column>
      <el-table-column
        prop="method"
        label="请求方法">
      </el-table-column>
      <el-table-column
        prop="regist_variable"
        label="注册变量">
      </el-table-column>
      <el-table-column
        prop="regular"
        label="正则匹配">
      </el-table-column>
      <el-table-column
        prop="hope_result"
        label="预期结果">
      </el-table-column>
       <el-table-column
        prop="is_model"
        label="设置模板">
        <template slot-scope="scope">
          <span v-if="scope.row.is_model === 1">是</span>
          <span v-if="scope.row.is_model === 0">否</span>
        </template>
      </el-table-column>



      <el-table-column align="left" width="200px">
        <template slot="header" slot-scope="scope">
          操作
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)" class="no-margin">编辑</el-button>
          <el-button
            size="mini"
            @click="test_(scope.$index, scope.row)" class="no-margin" type="primary">运行</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" class="no-margin">删除</el-button>
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
     name:'case_list',
     methods: {
         test_(index, row){
             this.test_run('case_run', row, this)
         },
         handleEdit(index, row) {
             this.my_edit('case_edit', {'row':row, 'groups': this.groups, 'headers':this.headers, 'mysqls':this.mysqls}, this)
         },
         handleDelete(index, row) {
             this.my_del('case_del', row, this)
         },
         request(){
             this.my_request('case_list', this);
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
            href: this.$root.$api,
            search: '',
            groups:this.$root.$groups,
            headers:this.$root.$headers,
            mysqls:this.$root.$headers,
            tableData:this.$my_table.case_list,
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
            this.my_search(this);
        }
      }
  }
</script>
<style scoped>

</style>
