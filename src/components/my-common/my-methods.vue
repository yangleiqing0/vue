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


  // Vue.prototype.my_search = function (that) {
  //
  //           const search = that.search.toLowerCase();
  //           console.log('search', search, that.allData)
  //           if (search) {
  //           // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
  //           // 注意： filter() 不会对空数组进行检测。
  //           // 注意： filter() 不会改变原始数组。
  //              that.tableData = that.allData.filter(data => {
  //             // some() 方法用于检测数组中的元素是否满足指定条件;
  //             // some() 方法会依次执行数组的每个元素：
  //             // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
  //             // 如果没有满足条件的元素，则返回false。
  //             // 注意： some() 不会对空数组进行检测。
  //             // 注意： some() 不会改变原始数组。
  //               return Object.keys(data).some(key => {
  //               // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
  //               // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
  //                 return String(data[key]).toLowerCase().indexOf(search) > -1
  //               })
  //           });
  //              that.totalCount = that.tableData.length
  //         }else {
  //               that.tableData = that.tabledata;
  //               that.totalCount = that.total_count
  //           }
  //       };
  Vue.prototype.my_search = function (that) {

            const search = that.search.toLowerCase();
            console.log('search_here', search)
            if (search) {
            // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
            // 注意： filter() 不会对空数组进行检测。
            // 注意： filter() 不会改变原始数组。
               that.searchData = that.allData.filter(data => {
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
                });
            });

               that.tableData = that.searchData.slice((that.currentPage-1)*that.PageSize, that.currentPage*that.PageSize);
               that.totalCount = that.searchData.length;
                console.log('search', that.tableData ,that.searchData)
          }else {
                that.tableData = that.searchData = that.tabledata ;
                that.totalCount = that.total_count
            }
        };


  Vue.prototype.my_edit =  function(route, row, that) {
      console.log('my_edit', route, row, that)
      that.$router.push({
          name: route,
          params: row
      })
  };


  Vue.prototype.my_del = function (route, row, that) {
                  if (row === 'more') row = that.multipleSelection;
                  if (row.length === 0) {
                      that.my_notify({info: '未选择数据'})
                  } else {
                      that.my_del_confirm(
                          () => {
                              that.$axios.post(that.$root.$api + route, {
                                  'id': row,
                              })
                                  .then(() => {
                                      that.request();
                                      if(that.search) {
                                          this.my_request(that.table_name + '_list', that, false, true);
                                          let search = that.search;
                                          this.search='';
                                          this.search=search
                                      }
                                      this.my_request(that.table_name + '_list',that, true, false, 1);
                                      this.my_request(that.table_name + '_list',that, false, true)
                                  })
                          })
                  }
         };

  Vue.prototype.my_request = function (route, that, all_first=false, all=false, page, pagesize=10){
          that.$axios.post(that.$root.$api + route, {
              page: page || that.currentPage || 1,
              pagesize:that.PageSize || pagesize,
              all:all
          })
              .then(res=> {
                  if(!all_first && !all){
                      console.log('!all!all_first')
                      this.$root.$totalCount[route] = that.totalCount=that.total_count= res.count;
                      if(res.groups) {
                          that.groups = res.groups;
                          that.$store.commit('SetStore', {key:'group_list', value:res.groups});
                      }
                      if(res.headers) {
                          that.headers = res.headers;
                          that.$store.commit('SetStore', {key:'header_list', value:res.headers});
                      }
                      if(res.mysqls) {
                          that.mysqls = res.mysqls;
                          that.$store.commit('SetStore', {key:'mysql_list', value:res.mysqls});
                      }
                      if(res.model_scenes) {
                          that.model_scenes = res.model_scenes;
                          this.$store.commit('SetDate',{key:'model_scenes', value:res.model_scenes})
                      }
                      if(res.model_cases) {
                          that.model_cases = res.model_cases;
                          this.$store.commit('SetDate',{key:'model_cases', value:res.model_cases})
                      }
                      that.tableData = that.tabledata =  res.list;
                      //
                  }
                  else {
                          if(all_first) {
                          console.log('all_first', res.list)
                          this.$root.$my_table[route] = res.list;
                          localStorage.setItem('my_table' + route, JSON.stringify(res.list))
                          }
                         if (all) {
                            that.allData = res.list;
                            that.$store.commit('SetStore', {key:route, value:res.list});
                            console.log('all', this.$store.state.my_all_table[route], res.list, res, route)
                      }
                  }
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

  };


  Vue.prototype.my_all_request = function () {
      let all_list = this.$my_list;
      if (this.$root.$user_id) {
          for (let i = 0; i < all_list.length; i++) {
              this.my_request(all_list[i] + '_list', this, true);
          }
      }
      for (let i = 0; i < all_list.length; i++) {
              this.my_request(all_list[i] + '_list', this, false, true);
          }
  };



  export default {

  }
</script>
