<template>
</template>

<script>
  import Vue from 'vue'

  Vue.prototype.my_notify = function(data, type=false, duration=1500) {
      if (type) {
          this.$notify({
              title: '警告',
              message: data,
              type: 'warning',
              duration: duration
          })
      } else {
          if (data.msg) {
              this.$notify({
                  title: '成功',
                  message: data.msg,
                  type: 'success',
                  duration: duration
              })
          } else if (data.err) {
              this.$notify.error({
                  title: '错误',
                  message: data.err,
                  duration: duration
              })
          } else if (data.warn) {
              this.$notify({
                  title: '警告',
                  message: data.warn,
                  type: 'warning',
                  duration: duration
              })
          } else if (data.info) {
              this.$notify.info({
                  title: '消息',
                  message: data.info,
                  duration: duration
              })
          }
      }
  };

  Vue.prototype.my_axios_post = function (url, params, Fuc=null){
                  this.$axios.post(url, params)
                      .then(res => {
                      console.log('res:',res);
                      if(res.data.msg) {
                          if (typeof Fuc === 'function') {
                              Fuc()
                          }
                      }
                  }).catch(err => {
                      console.log('err:',err);
                      if (typeof Fuc === 'function'){Fuc()}
                  })
                };


  Vue.prototype.my_del_confirm = function (fun) {
       this.$confirm('确认是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                      fun()
                  }).catch(() => {
                      this.my_notify({info:'已取消删除'})
                  });
  };


  Vue.prototype.my_search = function (that) {
            const search = that.search.toLowerCase();
            if (search) {
            // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
            // 注意： filter() 不会对空数组进行检测。
            // 注意： filter() 不会改变原始数组。
               that.tableData = that.tabledata.filter(data => {
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
               that.totalCount = that.tableData.length
          }else {
                that.tableData = that.tabledata;
                that.totalCount = that.total_count
            }
        };


  Vue.prototype.my_edit =  function(route, row, that) {
          that.$router.push({
              name:route,
              params: row
          })
         };

  Vue.prototype.my_del = function (route, row, that) {
               if(row === 'more') row=that.multipleSelection;
               if(row.length === 0){
                   that.my_notify({info:'未选择数据'})
               }else {
                   that.my_del_confirm(
                       () => {
                           that.$axios.post(that.$root.$api + route, {
                               'id': row,
                           })
                               .then(() => {
                                   that.request();
                               })
                       })
               }
         };

  Vue.prototype.my_request = function (route, that){
          that.$axios.get(that.$root.$api + route + '?user_id='+ that.$root.$user_id)
              .then(res=> {
                  if (route === 'case_list') {
                      that.groups = res.groups;
                      that.headers = res.headers;
                      that.mysqls = res.mysqls
                  }
                  that.tableData = that.tabledata = res.list;
                  that.totalCount=that.total_count= res.list.length
              })
         };

  Vue.prototype.my_logout = function (err=true, data=null) {
      this.$root.$user_name = '用户名称';
      this.$root.$user_id = 0;
      if (err) {
          this.$axios.get('/api/logout');
      }else{
          this.my_notify(data,true)
      }
      localStorage.removeItem('uid');
      this.$router.push('/login');

  };

  Vue.prototype.my_run = function () {
      document.querySelector('#show_msg').innerHTML = this.$root.$run_result
  };

  Vue.prototype.test_run = function (route, row, that) {
      this.$axios.post(that.$root.$api + route, row)
                  .then(res=>{
                      that.$root.$run_result = res;
                      this.my_run()
                  }).catch(err=>{
                      that.$root.$run_result = err;
                      this.my_run()
              });

  }

  export default {

  }
</script>
