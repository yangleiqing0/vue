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
        label="变量名称">
      </el-table-column>
      <el-table-column
        prop="value"
        label="变量的值">
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
     name:'variable_list',
     methods: {
         handleEdit(index, row) {
          this.$router.push({
              name:'variable_edit',
              params: row
          })
         },
         handleDelete(index, row) {
               if(row === 'more') row=this.multipleSelection;
               if(row.length === 0){
                   this.my_notify({info:'未选择数据'})
               }else {
                   this.my_del_confirm(
                       () => {
                           this.$axios.post('/api/variable_del', {
                               'id': row,
                           })
                               .then(() => {
                                   this.request();
                               })
                       })
               }
         },
         request(){
          this.$axios.get('/api/variable_list?user_id='+ this.$root.user_id)
              .then(res=> {
                  console.log('variables', res.variable_list);
                  this.tableData = this.tabledata = res.variable_list;
                  this.totalCount=this.total_count= res.variable_list.length
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
            tableData:[
                {name:' ', value:' ',description:' '},
                {name:' ', value:' ',description:' '},
                {name:' ', value:' ',description:' '},
                {name:' ', value:' ',description:' '},
                {name:' ', value:' ',description:' '},
                {name:' ', value:' ',description:' '},
                {name:' ', value:' ',description:' '},
                {name:' ', value:' ',description:' '},
                {name:' ', value:' ',description:' '},
                {name:' ', value:' ',description:' '},
                ],

             // 默认显示第几页
            currentPage:1,
             // 总条数，根据接口获取数据长度(注意：这里不能为空)
            totalCount:1,
             // 个数选择器（可修改）
            pageSizes:[1,2,5,10],
             // 默认每页显示的条数（可修改）
            PageSize:this.$root.PageSize,
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
        search:function () {
            const search = this.search.toLowerCase();
            if (search) {
            // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
            // 注意： filter() 不会对空数组进行检测。
            // 注意： filter() 不会改变原始数组。
               this.tableData = this.tabledata.filter(data => {
              // some() 方法用于检测数组中的元素是否满足指定条件;
              // some() 方法会依次执行数组的每个元素：
              // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
              // 如果没有满足条件的元素，则返回false。
              // 注意： some() 不会对空数组进行检测。
              // 注意： some() 不会改变原始数组。
                return Object.keys(data).some(key => {
                // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
                // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                  return String(data[key]).toLowerCase().indexOf(search) > -1
                })
            });
               this.totalCount = this.tableData.length
          }else {
                this.tableData = this.tabledata;
                this.totalCount = this.total_count
            }
        }
      }
  }
</script>
<style scoped>

</style>
