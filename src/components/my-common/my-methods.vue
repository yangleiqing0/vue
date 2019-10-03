<template>
</template>

<script>
  import Vue from 'vue'
  Vue.prototype.$username = '用户名称';

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

  export default {

  }
</script>
