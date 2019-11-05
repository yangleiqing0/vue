<template>

</template>

<script>
  import Vue from 'vue'
  import store from "../../store";
  Vue.prototype.$user_name = '用户名称';
  Vue.prototype.$user_id = 0;
  Vue.prototype.$api = store.state.api;
  Vue.prototype.$my_table ={
      case_list:[],
      group_list:[],
      header_list:[],
      mysql_list:[],
      report_list:[],
      scene_list:[],
      variable_list:[],
      email_list:[],
      job_list:[]
  };
  Vue.prototype.$my_table_first ={
      case_list:[],
      group_list:[],
      header_list:[],
      mysql_list:[],
      report_list:[],
      scene_list:[],
      variable_list:[],
      email_list:[]
  };
  // 每个数据组的首页的与user_id=用户的数据
  Vue.prototype.$my_email = store.state.email_methods;
  Vue.prototype.$currentPage = 1;
  Vue.prototype.$totalCount = {
      case_list:1,
      group_list:1,
      header_list:1,
      mysql_list:1,
      report_list:1,
      scene_list:1,
      variable_list:1,
      email_list:1,
      job_list:1
  };
  Vue.prototype.$pageSizes = [1,2,5,10];
  Vue.prototype.$PageSize = 10;   //全局每页显示数量
  Vue.prototype.$run_result = '';

  export default {
        name: "my-var"
    }
</script>

<style scoped>

</style>
