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
      row-key="id"
      :data="tableData"
      @selection-change="handleSelectionChange"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <!--      :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"-->
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="group_id"
        sortable=""
        label="分组名称">
         <template slot-scope="scope">
         <span v-for="group in groups" v-if="scope.row.group_id === group.id">{{group.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        sortable=""
        prop="name"
        label="场景名称">
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
     name:'scene_list',
     methods: {
         handleEdit(index, row) {
          this.my_edit('scene_edit', {'row':row, 'groups': this.groups, 'model_scenes':this.model_scenes, 'model_cases':this.model_cases}, this)
         },
         handleDelete(index, row) {
             this.my_del('scene_del', row , this)
         },
         request(){
             this.my_request('scene_list', this)
         },
         handleSizeChange(val){
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
            groups:this.$root.$groups,
            model_scenes:this.model_scenes,
            model_cases:this.$model_cases,
            tableData:this.$my_table.scene_list,
            searchDate:'',
            searchCount:'',
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
