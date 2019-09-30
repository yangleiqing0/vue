<template>
    <div class="out el-col-10">
        <p class="big">用户登录</p>
       <div id="Login" class="bac-white login">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
              <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
          var checkUserName = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('账号不能为空'));
            }else {
                callback();
            }
          };
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('密码不能为空'));
            } else {
              callback();
            }
          };
          return {
            ruleForm: {
              username: '',
              password: ''
            },
            rules: {
              password: [
                { validator: validatePass, trigger: 'blur' }
              ],
              username: [
                { validator: checkUserName, trigger: 'blur' }
              ]
            }
          };
        },
        methods: {
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.$axios.post('/api/login', {
                          'username': this.ruleForm.username,
                          'password': this.ruleForm.password
                  }).then(res=> {
                    this.my_notify(res.data)
                  }).catch(err => {this.my_notify(err, true)})
                }else {
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
        }
  }
</script>

<style scoped>
    #Login{
        position:absolute;
        top:50%;
        left:50%;
        border-radius: 5px;
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        transform:translate(-50%,-30%);
    }
    .out{
        height: 50%;
        background-color: white;
        position: relative;
        top:50%;
        left:50%;
        border-radius: 15px;

        transform:translate(-50%,-50%);
    }
    .login{
        margin-left: -32px;
    }
    p{
        font-size: 28px;
    }

</style>
