<template>
  <div class="edit">
    <div class="_edit edit-inner">
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="100px" :model="EmailForm" size="small" status-icon :rules="rules" ref="EmailForm">
      <el-form-item label="邮件主题" prop="subject">
        <el-input v-model="EmailForm.subject"></el-input>
      </el-form-item>
      <el-form-item label="邮件接收人" prop="to_user_list">
        <el-input v-model="EmailForm.to_user_list"></el-input>
      </el-form-item>
      <el-form-item label="邮件方式" prop="email_method">
        <el-select v-model="value" placeholder="请选择" class="el-col-24" value="">
          <el-option
            v-for="item in $my_email"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('EmailForm')">提交</el-button>
        <el-button @click="resetForm('EmailForm')">重置</el-button>
        <el-button @click="back">后退</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name:'report_email',
    data() {
        var checkUserList = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('不能为空'));
          }else {
              this.$axios.post('/api/email_user_list_validate', {
                  to_user_list: value})
                  .then(res=>{
                      if(res) {
                          callback();
                      }else{
                          return callback(new Error('格式错误'));
                      }
                  });
          }
        };
        return {
            value: 2,
            EmailForm: {
                subject:'',
                to_user_list:'',
                email_method: '',
                report_id:'',
            },
            rules: {
                to_user_list: [
                { validator: checkUserList, trigger: 'blur' }
              ]
            },
            labelPosition: 'right'
        };
      },
      methods:{
         getParams(){//接收函数
              this.EmailForm.report_id = this.$route.params.id;
          },
          submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                this.EmailForm.email_method = this.value;
                this.$router.push('/report_list');
                this.$axios.post('/api/report_email', this.EmailForm)
                    .then(()=> {
                })
            }else {
              return false;
            }
          });
        },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          },
          back(){
              this.$router.go(-1);//返回上一层
          },
        },
      created() {//在模板编译进路由前调用created方法，触发接收函数
          this.getParams();
    }
  }
</script>
