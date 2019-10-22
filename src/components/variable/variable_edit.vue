<template>
  <div class="edit">
    <div class="_edit edit-inner">
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="VariableForm" size="small" status-icon :rules="rules" ref="VariableForm">
      <el-form-item label="变量名称" prop="name">
        <el-input v-model="VariableForm.name"></el-input>
      </el-form-item>
      <el-form-item label="变量的值" prop="value">
        <el-input v-model="VariableForm.value"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input v-model="VariableForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('VariableForm')">提交</el-button>
        <el-button @click="resetForm('VariableForm')">重置</el-button>
        <el-button @click="back">后退</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name:'variable_edit',
    data() {
      var checkName = (rule, value, callback) => {

        if (!value) {
          return callback(new Error('不能为空'));
        }else {
            let update=false;
            if (this.VariableForm.id) update=true;
            this.$axios.post('/api/variable_validate', {
                name: value,
                variable_id: this.VariableForm.id,
                update:update
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
            callback();
        }
      };
        return {
            page:1,
            VariableForm: {
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
                this.VariableForm = this.$route.params.row;
                this.page = this.$route.params.page
            },
            submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.$axios.post('/api/variable_edit',
                        this.VariableForm
              )
                      .then(()=> {
                      this.$router.push({name:'variable_list', params:{page:this.page}});
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
