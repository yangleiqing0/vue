<template>
  <div class="edit">
    <div class="_edit edit-inner">
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="120px" :model="Form" size="small" status-icon :rules="rules" ref="Form">
      <el-form-item label="配置名称" prop="name">
        <el-input v-model="Form.name"></el-input>
      </el-form-item>
       <el-form-item label="服务器地址" prop="ip">
        <el-input v-model="Form.ip"></el-input>
      </el-form-item>
       <el-form-item label="服务器端口" prop="port">
        <el-input v-model="Form.port"></el-input>
      </el-form-item>
       <el-form-item label="服务器用户" prop="user">
        <el-input v-model="Form.user"></el-input>
      </el-form-item>
      <el-form-item label="服务器密码" prop="password">
        <el-input v-model="Form.password"></el-input>
      </el-form-item>
      <el-form-item label="数据库名" prop="db_name">
        <el-input v-model="Form.db_name"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input v-model="Form.description"></el-input>
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
    name:'mysql_edit',
    data() {
      var checkName = (rule, value, callback) => {

        if (!value) {
          return callback(new Error('不能为空'));
        }else {
            this.$axios.post('/api/mysql_validate', {
                name: value,
                mysql_id: this.Form.id
                })
                .then(res=>{
                    if(res) {
                        callback();
                    }else{
                        return callback(new Error('名称已存在'));
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
            Form: {
                name: '',
                ip:'',
                port:'',
                user:'',
                password:'',
                db_name:'',
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
               if (this.$route.params.row) {
                  this.Form = this.$route.params.row;
              }
                console.log('mysql', this.Form)
                if (this.$route.params.id && this.$route.params.row === undefined){
                  this.my_get_data(this.$route.params.id, 'mysql_list', this)
                  console.log('mysql_edit_refresh', this.Form);
              }
            },
            submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.$axios.post('/api/mysql_edit',
                        this.Form
              )
                      .then(()=> {
                      this.$router.push('/mysql_list');

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
