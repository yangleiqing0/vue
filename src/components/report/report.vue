<template >
  <div v-loading="to_load"
  element-loading-text="拼命加载中"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.8)" class="load">
  <MyMailTable
    :tableData="mail_tableData" :tableStyle="{ width:'1200px', lineHeight:'3',
  margin:'0 auto', fontSize:'16px'}"
  ></MyMailTable>

    <el-table
      border
      empty-text
      row-key="id"
      style="width: 100%"
      :data="tableData"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'5px'}"
      :tree_props="tree"
      :span-method="SpanMethod"
      >
      <el-table-column show-overflow-tooltip
        prop="t_name"
        sortable=""
        label="用例名称">
      </el-table-column>
      <el-table-column show-overflow-tooltip
        sortable=""
        prop="url"
        label="请求接口">
      </el-table-column>
      <el-table-column show-overflow-tooltip
        sortable=""
        prop="method"
        label="请求方式">
      </el-table-column>
      <el-table-column show-overflow-tooltip
        sortable=""
        prop="request_body"
        label="请求报文">
      </el-table-column>
      <el-table-column show-overflow-tooltip
        sortable=""
        prop="hope"
        label="预期结果">
      </el-table-column>
      <el-table-column show-overflow-tooltip
        sortable=""
        prop="response_body"
        label="响应报文">
      </el-table-column>
      <el-table-column show-overflow-tooltip
        sortable=""
        prop="test_result"
        label="响应验证">
      </el-table-column>
      <el-table-column show-overflow-tooltip
        sortable=""
        prop="old_sql_value"
        label="数据库原值">
      </el-table-column>
      <el-table-column show-overflow-tooltip
        sortable=""
        prop="old_sql_value_result"
        label="原值验证">
      </el-table-column>
      <el-table-column show-overflow-tooltip
        sortable=""
        prop="new_sql_value"
        label="数据库现值">
      </el-table-column>
      <el-table-column show-overflow-tooltip
        sortable=""
        prop="new_sql_value_result"
        label="现值验证">
      </el-table-column>

      <el-table-column show-overflow-tooltip
        sortable=""
        prop="result"
        label="测试结果">
      <template slot-scope="scope">
        <MySucTag :scope="scope" :result="'result'"></MySucTag>
      </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>

  export default {
     name:'report',
      data() {
          return{
              loading:true,
              tree: {children: 'children', hasChildren: 'hasChildren'},
              mail_tableData: [
                {key: '项目名称', value: ''},
                {key: '项目版本', value: ''},
                {key: '运行环境', value: ''},
                {key: '测试网络', value: ''},
                {key: '用例总数', value: ''},
                {key: '通过总数', value: ''},
                {key: '失败总数', value: ''},
                {key: '测试时间', value: ''},
                {key: '分数', value: ''},
              ],
              tableData:[]
          }
      },
      methods:{
         SpanMethod({ row, column, rowIndex, columnIndex }){
             // 如果存在场景id 按照场景显示
             if(row.count) {
                 if (columnIndex === 0) {
                     row.t_name = row.name;
                     return [1, 11]
                 }else if(11 > columnIndex  &&  columnIndex > 0){
                      // 被合并的单元不宽度为0
                     return [0, 0]
                 }
             }else {
                 // console.log('row.data', row.data, row.testcase_data)
                row.t_name=(row.t_name)? row.t_name:row["testcase_name"];
                row.url=(row.url)? row.url:row["testcase_url"];
                row.method=(row.method)? row.method:row["testcase_method"];
                row.request_body=(row.request_body)? row.request_body:row["testcase_data"];
                row.hope=(row.hope)? row.hope:row["testcase_hope_result"];
                row.test_result=(row.test_result)? row.test_result:row["testcase_test_result"];
             }
         },
         get_params(){
             let id = this.$route.params.id;
             this.$axios.post(this.$root.$api + 'report', {id: id})
                  .then(res => {
                      const {allocation, items} = res;
                      const {zdbm_version, test_net, fail_sum, time_strftime, test_pl, test_sum, test_name, score, test_success} = allocation;
                      this.mail_tableData[0].value = test_name;
                      this.mail_tableData[1].value = zdbm_version;
                      this.mail_tableData[2].value = test_net;
                      this.mail_tableData[3].value = test_pl;
                      this.mail_tableData[4].value = test_sum;
                      this.mail_tableData[5].value = test_success;
                      this.mail_tableData[6].value = fail_sum;
                      this.mail_tableData[7].value = time_strftime;
                      this.mail_tableData[8].value = score;
                      this.tableData = items
                  })
         }
      },
      created(){
          this.get_params()
      },
      watch:{
          //  监视搜索栏 进行筛选

      },
      computed:{
         to_load:function () {
             return !(this.tableData.length && this.mail_tableData.length)
         }
      }
  }
</script>
<style>
.load{
  box-shadow: unset !important;
  background-color: white;
}
</style>
