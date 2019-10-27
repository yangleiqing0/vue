<template>
  <div class="edit">
    <div class="_edit edit-inner">
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="100px" :model="Form" size="small" status-icon :rules="rules" ref="Form">
      <el-form-item label="邮件名称" prop="name">
        <el-input v-model="Form.name"></el-input>
      </el-form-item>
      <el-form-item label="邮件主题" prop="subject">
        <el-input v-model="Form.subject"></el-input>
      </el-form-item>
      <el-form-item label="邮件接收人" prop="to_user_list">
        <el-input v-model="Form.to_user_list"></el-input>
      </el-form-item>
      <el-form-item label="邮件方式" prop="email_method">
        <el-select v-model="value" placeholder="请选择" class="el-col-24" value="">
          <el-option
            v-for="item in email_methods"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('Form')">提交</el-button>
        <el-button @click="resetForm('Form')">重置</el-button>
        <el-button @click="back">后退</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name:'email_edit',
    data() {
        var checkName = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('不能为空'));
          }else {
              this.$axios.post('/api/email_validate', {
                  name: value,
                  email_id: this.Form.id})
                  .then(res=>{
                      if(res) {
                          callback();
                      }else{
                          return callback(new Error('名称已存在'));
                      }
                  });
          }
        };
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
            value: 1,
            email_methods:this.$store.state.email_methods,
            Form: {
                name: '',
                subject:'',
                to_user_list:'',
                email_method: ''
            },
            rules: {
                name: [
                  { validator: checkName, trigger: 'blur' }
                ],
                to_user_list: [
                { validator: checkUserList, trigger: 'blur' }
              ]
            },
            labelPosition: 'right'
        };
      },
      methods:{
          getParams(){//接收函数
              if (this.$route.params.row) {
                  this.Form = this.$route.params.row;
                  this.value = this.Form.email_method;
              }
              if (this.value===undefined) this.value =1;
              if (this.$route.params.id && this.$route.params.row === undefined){
                  this.my_get_data(this.$route.params.id, 'email_list', this)
                  console.log('email_edit_refresh', this.Form);
              }
          },
          submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                this.Form.email_method = this.value;
                this.$axios.post('/api/email_edit', this.Form)
                    .then(()=> {
                    this.$router.push('/email_list');

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
           console.log('created:', this.$my_email, this.value)
      }
  }
</script>
