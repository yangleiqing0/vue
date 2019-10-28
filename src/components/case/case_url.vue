<template>
  <div class="app">
        <div class="el-col-24 out-operate">
        <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索" class="no-padding search "/>
        </div>
    <el-table
      border
      row-key="id"
      style="width: 100%"
      :data="tableData"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'5px'}"
      >
      <el-table-column show-overflow-tooltip sortable=""
      type="index"
      width="50">
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable=""
        prop="url"
        label="测试用例接口">
      </el-table-column>
    </el-table>
    <div class="tabListPage">
      <div>
       <el-pagination
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
     name:'case_url',
      data() {
          return{
              search:'',
              tableData: this.$store.state['case_url'],
              currentPage: 1,
               // 总条数，根据接口获取数据长度(注意：这里不能为空)
               // 个数选择器（可修改）
              pageSizes:[1000,],
              totalCount:1,
               // 默认每页显示的条数（可修改）
              PageSize:1000,
              tabledata:this.$store.state['case_url'],
              total_count:1,
          }
      },
      methods:{

      },
      created(){
          this.my_request('case_url', this, false, true);
          this.my_get_localStore('case_url')
      },
      watch:{
          //  监视搜索栏 进行筛选
        search(){
            this.my_search(this)
        },
        $route(to, from ,next){
            next()
        }
      },
  }
</script>
<style scoped>{

}
</style>
