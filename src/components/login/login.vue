<template>
    <div class="out el-col-10">
        <p class="big">用户登录</p>
       <div id="Login" class="bac-white login">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" size="mini" >
              <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码"  prop="password">
                <el-input type="password" v-model="ruleForm.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button @click="clear">忘记密码</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {

        mounted() {
          this.getlocalStorage()
        },
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
                  let that = this;
                  that.$axios.post(this.$store.state.api + 'login', {
                  'username': that.ruleForm.username,
                  'password': that.ruleForm.password
              })
                      .then(res=> {
                          if(res.err){
                              return false
                          }
                      that.$root.$user_name = that.ruleForm.username;
                      that.$root.$user_id = res.data.user_id;
                      that.$router.push({name:'case_list'});
                      // that.my_all_request();
                      that.setlocalStorage(that.ruleForm.username, that.ruleForm.password, that.$root.$user_id);
                  })
              }else {
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          },
          setlocalStorage:function(c_name, c_pwd, uid) {
          localStorage['username'] = c_name;
          localStorage['password'] = c_pwd;
          localStorage['uid'] = uid
          },
          getlocalStorage: function() {
            this.ruleForm.username = localStorage.getItem('username') ;//保存到保存数据的地方
            this.ruleForm.password = localStorage.getItem('password')
          },
          // 点击忘记密码，清空localStorage里的存储
          clear: function() {
            this.setlocalStorage('', '');
            this.ruleForm.username = '';
            this.ruleForm.password = ''
          },
        },
        created(){
          // window.localStorage.clear()
        }

  }
</script>

<style scoped>
    #Login, ._edit{
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
