<template>

</template>

<script>
  import Vue from 'vue'
  Vue.prototype.$user_name = '用户名称';
  Vue.prototype.$user_id = 0;
  Vue.prototype.$api = '/api';
  Vue.prototype.$my_table ={
      case_list:[],
      group_list:[],
      header_list:[],
      mysql_list:[],
      report_list:[],
      scene_list:[],
      variable_list:[],
      email_list:[]
  };
  Vue.prototype.$my_first_table ={
      case_list:[],
      group_list:[],
      header_list:[],
      mysql_list:[],
      report_list:[],
      scene_list:[],
      variable_list:[],
      email_list:[]
  };
  Vue.prototype.$headers = [];
  Vue.prototype.$groups = [];
  Vue.prototype.$my_list = ['group', 'header', 'mysql', 'case', 'report', 'scene', 'variable', 'email'];
  Vue.prototype.$mysqls = [];
  Vue.prototype.$model_scenes = [];
  Vue.prototype.$model_cases = [];
  Vue.prototype.$my_email = [{key:1, value:'图片'},{key:2, value:'附件'}];
  Vue.prototype.$currentPage = 1;
  Vue.prototype.$totalCount = {
      case_list:1,
      group_list:1,
      header_list:1,
      mysql_list:1,
      report_list:1,
      scene_list:1,
      variable_list:1,
      email_list:1
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
