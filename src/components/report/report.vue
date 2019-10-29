<template>
  <MyMailTable :tableData="tableData" :tableStyle="{ width:'1200px', lineHeight:'3',
  margin:'0 auto', marginTop:'20px', fontSize:'16px'}"></MyMailTable>

</template>

<script>

  export default {
     name:'report',
      data() {
          return{
              tableData: [
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
          }
      },
      methods:{
         get_params(){
             let id = this.$route.params.id;
             this.$axios.post(this.$root.$api + 'report', {id: id})
                  .then(res => {
                      let location = res.allocation;
                      this.tableData[0].value = location.test_name;
                      this.tableData[1].value = location.zdbm_version;
                      this.tableData[2].value = location.test_net;
                      this.tableData[3].value = location.test_pl;
                      this.tableData[4].value = location.test_sum;
                      this.tableData[5].value = location.test_success;
                      this.tableData[6].value = location.fail_sum;
                      this.tableData[7].value = location.time_strftime;
                      this.tableData[8].value = location.score;
                  })
         }
      },
      created(){
          this.get_params()
      },
      watch:{
          //  监视搜索栏 进行筛选

      },
  }
</script>
<style>

</style>
