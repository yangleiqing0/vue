<template>
  <div class="edit">
    <div class="_edit edit-inner">
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="120px" :model="HeaderForm" size="small" status-icon :rules="rules" ref="HeaderForm">
      <el-form-item label="请求头部名称" prop="name">
        <el-input v-model="HeaderForm.name"></el-input>
      </el-form-item>
      <el-form-item label="请求头部的值" prop="value">
        <el-input v-model="HeaderForm.value"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input v-model="HeaderForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('HeaderForm')">提交</el-button>
        <el-button @click="resetForm('HeaderForm')">重置</el-button>
        <el-button @click="back">后退</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name:'header_edit',
    data() {
      var checkName = (rule, value, callback) => {

        if (!value) {
          return callback(new Error('不能为空'));
        }else {
            this.$axios.post('/api/header_validate', {
                name: value,
                header_id: this.HeaderForm.id
                })
                .then(res=>{
                    if(res) {
                        callback();
                    }else{
                        return callback(new Error('变量已存在'));
                    }
                });
        }
      };
      var checkValue = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }else {
            this.$axios.post('/api/header_value_validate', {
                value: value
                })
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
            HeaderForm: {
                name: '',
                value:'',
                description: ''
            },
            rules: {
              name: [
                { validator: checkName, trigger: 'blur' }
              ],
              value: [
                { validator: checkValue, trigger: 'blur' }
              ]
            },
            labelPosition: 'right'
        };
      },
      methods:{
            getParams(){//接收函数
                this.HeaderForm = this.$route.params;
            },
            submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.$axios.post('/api/header_edit',
                        this.HeaderForm
              )
                      .then(()=> {
                      this.$router.push('/header_list');

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
