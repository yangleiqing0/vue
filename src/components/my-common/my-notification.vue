<template>
</template>

<script>
  import Vue from 'vue'

  Vue.prototype.my_notify = function(data, type=false, duration=2500) {
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
      ;
  }
  export default {

  }
</script>
