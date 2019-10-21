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
  Vue.prototype.$headers = [];
  Vue.prototype.$groups = [];
  Vue.prototype.$mysqls = [];
  Vue.prototype.$model_scenes = [];
  Vue.prototype.$model_cases = [];
  Vue.prototype.$my_email = [{key:1, value:'图片'},{key:2, value:'附件'}];
  Vue.prototype.$currentPage = 1;
  Vue.prototype.$totalCount = 4;
  Vue.prototype.$pageSizes = [1,2,5,10];
  Vue.prototype.$PageSize = 10;   //全局每页显示数量
  Vue.prototype.$run_result = '';

  export default {
        name: "my-var"
    }
</script>

<style scoped>

</style>
