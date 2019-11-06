<template>
  <div class="app">
    <el-table
      border
      row-key="id"
      style="width: 100%"
      :data="tableData"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'5px'}"
      >
      <el-table-column show-overflow-tooltip
      type="index"
      width="50">
      </el-table-column>
      <el-table-column show-overflow-tooltip
        prop="name"
        label="测试用例名称">
      </el-table-column>
      <el-table-column show-overflow-tooltip
        prop="response_body"
        label="请求返回报文">
      </el-table-column>
      <el-table-column show-overflow-tooltip
        prop="scene_name"
        label="归属测试场景">
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
     name:'request',
      data() {
          return{
              search:'',
              tableData: [],
              currentPage: 1,
               // 总条数，根据接口获取数据长度(注意：这里不能为空)
               // 个数选择器（可修改）
              pageSizes:[1000,],
               // 默认每页显示的条数（可修改）
              PageSize:1000,
              tabledata:[],
              total_count:1,
          }
      },
      methods:{

      },
      created(){
          console.log('request:', this.$route.params)
          // this.my_request('request_play', this);
          if(this.$route.params) {
              this.$axios.post(this.$store.state.api+'request_play', this.$route.params)
                  .then(res=>{
                      this.tableData = res.list;console.log('created request:', this.tableData, res)
                  })

              // this.my_get_localStore('case_url')
          }
      },
      computed:{
         totalCount(){
             return (this.tableData)?this.tableData.length:0
         }
      },
      watch:{
          //  监视搜索栏 进行筛选
        $route(to, from ,next){
            next()
        }
      },
  }
</script>
<style scoped>{

}
</style>
