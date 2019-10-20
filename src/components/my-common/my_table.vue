<template>
  <div class="app">
        <div class="el-col-24 out-operate">
          <div  :class="up_class">
            <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索" class="no-padding search "/>
                  <div class="no-padding operate">
                    <el-button
                    size="mini" v-if="table_name!=='report'"
                    @click="handleEdit(0, '')" class="no-margin" style="margin-top: 2px">添加</el-button>
                    <form v-if="table_name ==='case'" :action="href+'/case_upload'" method="post" enctype="multipart/form-data" style="margin-top: -6px;float: left">
                      <div class="padding-top">
                        <input type="file" id="upload_xlsx" name="upload_xlsx" class="el-button el-button--mini" style="width: 170px;padding: 2px;">
                      </div>
                      <div class="padding-top" style="margin-top: 8px;padding-right: 4px">
                          <input type="submit" value="上传" class="el-button el-button--mini" style="margin-top: -2px">
                      </div>
                    </form>
                    <el-link v-if="table_name ==='case'"  :underline=false  type="primary" :href="href+'/case_download'" style="margin-top: 2px"><el-button
                    size="mini"
                    style="margin-top: -3px">下载</el-button></el-link>
                    <el-button
                    size="mini"
                    @click="handleDelete(0, 'more')" class=" no-margin" style="margin-top: 2px">批量删除</el-button>
                  </div>
          </div>
      </div>
    <el-table
      border
      row-key="id"
      style="width: 100%"
      :data="tableData"
      @selection-change="handleSelectionChange"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'5px'}"
      :tree-props="tree_props">
      <slot></slot>
        <el-table-column align="left"  :width="operate_width">
          <template slot="header" slot-scope="scope">
            操作
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"  v-if="table_name!=='report'"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="success" v-if="table_name ==='report'"
              @click="$parent.sendEmail(scope.row)">邮件发送</el-button>
             <el-button
              size="mini" v-if="table_name ==='case'"
              @click="$parent.test_(scope.$index, scope.row)" class="no-margin" type="primary">运行</el-button>

            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)" v-if="table_name ==='case'" style="margin-left: 0">删除</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)" v-else="table_name !=='case'">删除</el-button>
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
     name:'my_table',
     props: {
         table_name: {
             type: String,
             default: ''
         },
         operate_width:{
             type:String,
             default:''
         },
         up_class:{
             type:String,
             default:''
         },
         tree_props: {
             type: Object,
             default() {
                return {
                  hasChildren: 'hasChildren',
                  children: 'children'
                };
              }
         },
     },
     methods: {

         handleEdit(index, row) {
             if(this.table_name === 'scene'){
                 this.my_edit('scene_edit', {'row':row, 'groups': this.groups, 'model_scenes':this.model_scenes, 'model_cases':this.model_cases}, this)
             } else if (this.table_name === 'case'){
                 this.my_edit('case_edit', {'row':row, 'groups': this.groups, 'headers':this.headers, 'mysqls':this.mysqls}, this)
             }
             else {
                 this.my_edit(this.table_name + '_edit', row, this)
             }
         },
         handleDelete(index, row) {
             this.my_del(this.table_name+'_del', row, this)
         },
         request(){
             if(!this.search) {
                 // 没有查询条件 进行实时查询
                 this.my_request(this.table_name + '_list', this)
             }else {
                 // 有查询条件的时候根据返回来的所有值进行过滤查询
                  this.tableData = this.searchData.slice((this.currentPage-1)*this.PageSize, this.currentPage*this.PageSize);
                  this.totalCount = this.searchData.length
             }
         },
         handleSizeChange(val) {
         // 改变每页显示的条数
             this.PageSize=val;
             console.log(this.table_name + '_list: handleSizeChange', this.PageSize, this.currentPage);
             // 注意：在改变每页显示的条数时，要将页码显示到第一页
             if (this.currentPage !==1 ) {
                 this.currentPage = 1;
                 this.$router.push({name: this.table_name+'_list', params: {page: this.currentPage}})
             }
             else {
                 this.request();
             }
         },
         handleCurrentChange(val) {
             // 改变默认的页数
             console.log(this.table_name + '_list: handleCurrentChange', this.PageSize, this.currentPage);
             this.currentPage=val;
             this.$router.push({name: this.table_name+'_list', params:{page: this.currentPage}})
         },
         handleSelectionChange(val){
             // 改变勾选的行
             this.multipleSelection = val
         }
       },
      data() {
        return {
            model_scenes:this.$root.$model_scenes,
            model_cases:this.$root.$model_cases,
            groups:this.$root.$groups,
            headers:this.$root.$headers,
            mysqls:this.$root.$headers,
            href: this.$root.$api,
            searchData:[],
            allData:this.$my_all_table[this.table_name + '_list'],
            search: '',
            tableData:this.$my_table[this.table_name + '_list'],
             // 默认显示第几页
            currentPage:this.$currentPage,
             // 总条数，根据接口获取数据长度(注意：这里不能为空)
            totalCount:this.$totalCount,
             // 个数选择器（可修改）
            pageSizes:this.$pageSizes,
             // 默认每页显示的条数（可修改）
            PageSize:this.$PageSize,
            tabledata:[],
            total_count:1,
            multipleSelection: []
        }
      },
      mounted(){
         if (!this.$route.params.page) {
                this.$route.params.page = 1;
            }
      },
      created(){
            console.log(this.table_name + '_list');
            this.request();
      },
      // 子组件的 beforeRouteUpdate函数不起作用
      // beforeRouteUpdate(to, from , next){
      //    console.log('beforeRouteUpdate' + this.table_name)
      //    next();
      //    this.currentPage = parseInt(this.$route.params.page) || 1;
      //    this.request()
      // },
      watch:{
          //  监视搜索栏 进行筛选
        search(){
            this.my_search(this)
        },
        $route(to, from ,next){
            // console.log('$route' + this.table_name)
            this.currentPage = parseInt(this.$route.params.page) || 1;
            this.request();
        }
      }
  }
</script>
<style scoped>{

}
</style>
