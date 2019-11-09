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
        prop="response_body" label="请求返回报文"
        >
        <template slot-scope="scope">
          <div v-loading="scope.row.is_show" v-show="scope.row.is_show"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.3)" class="request"></div>
          <div v-show="!scope.row.is_show">{{scope.row.response_body}}</div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip
        prop="scene_name"
        label="归属测试场景">
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="Start"  :disabled="disabled_start">开始</el-button>
    <el-button @click="ToReport"  :disabled="disabled_start?case_report_OK:true">查看测试报告</el-button>
<!--    <div class="tabListPage">-->
<!--      <div>-->
<!--       <el-pagination-->
<!--          :current-page="currentPage"-->
<!--          :page-sizes="pageSizes"-->
<!--          :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"-->
<!--          :total="totalCount"-->
<!--          background>-->
<!--       </el-pagination>-->
<!--      </div>-->
<!--    </div>-->
  </div>

</template>

<script>

  export default {
     name:'request',
      data() {
          return{
              disabled_start:false,
              scene_async: false,
              case_report_OK:false,
              show_load:true,
              to_load:true,
              search:'',
              over_count:[],
              scene_case_list:[],
              testcase_ids:[],
              tableData: [
                  {
                      id:'',
                      name:'',
                      response_body:''
                  }
              ],
              // currentPage: 1,
              //  // 总条数，根据接口获取数据长度(注意：这里不能为空)
              //  // 个数选择器（可修改）
              // pageSizes:[1000,],
              //  // 默认每页显示的条数（可修改）
              // PageSize:1000,
              // tabledata:[],
              // total_count:1,
          }
      },
      methods:{
          ToPostReport(){
              this.$axios.post(this.$store.state.api+ 'report', {time_id:this.$route.params.id})
                            .then(res=>{
                                if(res){
                                    this.case_report_OK = false
                                }
                            });
          },
          ToRequest(data, number){
                console.log('ToRequest', data, number,this.tableData)
                if (number === data.length) {
                        this.ToPostReport();
                        return
                    }
                if (!data[number].response_body) {
                    data[number].is_show = true;
                    this.$axios.post(this.$store.state.api + 'request_start', {
                        case_id: data[number].id,
                        time_id: this.$route.params.id
                    })
                        .then(res => {
                            data[number].is_show = false;
                            data[number].response_body = res;
                            number += 1;
                            this.ToRequest(data, number)
                        })
                }else{
                    number += 1;
                    this.ToRequest(data, number)}
          },
          ToAsyncRequest(data, number){
                console.log('ToRequest', data, number, data[number], this.testcase_ids.indexOf(data[number]),
                    number < data.length, this.tableData[this.testcase_ids.indexOf(data[number])]);
                if(this.over_count.length===this.tableData.length){
                    this.ToPostReport();
                }
                if (number < data.length) {
                    if (!this.tableData[this.testcase_ids.indexOf(data[number])].response_body) {
                        this.tableData[this.testcase_ids.indexOf(data[number])].is_show = true;
                        this.$axios.post(this.$store.state.api + 'request_start', {
                            case_id: data[number],
                            time_id: this.$route.params.id
                        })
                            .then(res => {
                                this.over_count.push(1);
                                this.tableData[this.testcase_ids.indexOf(data[number])].is_show = false;
                                this.tableData[this.testcase_ids.indexOf(data[number])].response_body = res;
                                number += 1;
                                this.ToAsyncRequest(data, number)
                            })
                    } else {
                        number += 1;
                        this.ToAsyncRequest(data, number)
                    }
                }
          },
          ToReport(){
              this.$router.push({
                  name:'report',
                  params:{
                      id:this.$route.params.id
                  }
              })
          },
          Start(){
              let table_data = this.tableData;
              this.case_report_OK = true;
              this.disabled_start = true;
              if(this.scene_async){
                  for (let i = 0; i < this.scene_case_list.length; i++) {
                      this.ToAsyncRequest(this.scene_case_list[i], 0)
                  }
              }
              else {
                  this.ToRequest(table_data, 0)
              }
          }
      },
      created(){
          this.scene_async = this.$route.query.scene_async === '1';
          console.log('request:', this.$route.params.id, typeof this.$route.query.scene_async, this.scene_async);
          if(this.$route.params) {
              this.$axios.post(this.$store.state.api+'request_play', this.$route.params)
                  .then(res=>{
                      this.tableData = res.list;
                      this.scene_case_list = res.scene_case_list;
                      this.testcase_ids = res.testcase_ids;
                      console.log('created request:', this.tableData, this.testcase_ids);
                      for(let i=0;i<this.tableData.length;i++){
                          if(!this.tableData[i].response_body){this.disabled_start=false;return}
                      }
                      this.disabled_start=true
                  })

          }
          console.log('request-after:', this.tableData);
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
