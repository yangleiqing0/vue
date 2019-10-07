<template>

</template>

<script>
  import Vue from 'vue'
  Vue.prototype.$user_name = '用户名称';
  Vue.prototype.$user_id = 0;
  Vue.prototype.$api = '/api';
  // {name:' '},{name:' '},{name:' '},{name:' '},{name:' '},{name:' '},{name:' '},{name:' '},{name:' '},{name:' '}
  Vue.prototype.$my_table = [];
  Vue.prototype.$my_email = [{key:1, value:'图片'},{key:2, value:'附件'}];
  Vue.prototype.$currentPage = 1;
  Vue.prototype.$totalCount = 1;
  Vue.prototype.$pageSizes = [1,2,5,10];
  Vue.prototype.$pageSizes = [1,2,5,10];
  Vue.prototype.$PageSize = 10;   //全局每页显示数量
  Vue.prototype.$run_result = '';

  export default {
        name: "my-var"
    }
</script>

<style scoped>

</style>
