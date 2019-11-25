<template>
  <div class="">
<!--    <div class="_edit edit-inner">-->
    <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="150px" :model="Form" size="small" status-icon :rules="rules" ref="Form">
        <div class="el-col-8" style="margin-left: -70px">
        <el-form-item label="用例名称" prop="name">
        <el-input v-model="Form.name" type="textarea" autosize=""></el-input>
        </el-form-item>
        <el-form-item label="用例分组" prop="group_id">
          <el-select v-model="Form.group_id" filterable placeholder="请选择" class="el-col-24" size="big" value="">
            <el-option
              v-for="item in groups"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请求头部" prop="header_id" >
          <el-select v-model="Form.header_id" filterable placeholder="请选择" class="el-col-24" size="big" value="">
            <el-option
              v-for="item in headers"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请求方式" prop="method" :rules="lengthCheck(0,10)">
          <el-input v-model="Form.method" type="textarea" autosize=""></el-input>
        </el-form-item>
         <el-form-item label="请求接口" prop="url" :rules="lengthCheck(0,500)">
          <el-input v-model="Form.url" type="textarea" autosize=""></el-input>
        </el-form-item>
         <el-form-item label="注册变量" prop="regist_variable">
          <el-input v-model="Form.regist_variable" type="textarea" autosize=""></el-input>
        </el-form-item>
        <el-form-item label="注册规则" prop="regular" >
          <el-input v-model="Form.regular" type="textarea" autosize=""></el-input>
        </el-form-item>
        <el-form-item label="请求报文" prop="data">
          <el-input v-model="Form.data"  type="textarea" autosize=""></el-input>
        </el-form-item>
        <el-form-item label="预期结果" prop="hope_result">
          <el-input v-model="Form.hope_result"  type="textarea" autosize=""></el-input>
        </el-form-item>
        <el-form-item label="设置模板" prop="is_model">
          <el-select v-model="Form.is_model" placeholder="请选择" class="el-col-24" size="big" value="">
            <el-option
              v-for="item in is_models"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
    </div>
        <div class="el-col-8" >
          <div v-show="wait_config">
            <el-form-item label="前置等待查询语句" prop="wait.old_wait_sql" >
              <el-input v-model="Form.wait.old_wait_sql"  type="textarea" autosize=""></el-input>
            </el-form-item>
            <el-form-item label="前置等待数据库查询" prop="wait.old_wait_mysql" >
              <el-select v-model="Form.wait.old_wait_mysql" filterable placeholder="请选择" size="big" value="" class="el-col-24" >
                <el-option
                  v-for="item in mysqls"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="前置等待数据库运行">
              <el-button @click="run_old_wait_mysql" type="primary" class="el-col-24">运行</el-button>
            </el-form-item>

            <el-form-item label="前置等待预期结果" prop="wait.old_wait">
              <el-input v-model="Form.wait.old_wait"  type="textarea" autosize=""></el-input>
            </el-form-item>
            <el-form-item label="前置等待超时设置" prop="wait.old_wait_time" :rules="typeNumber">
              <el-input v-model="Form.wait.old_wait_time"  type="textarea" autosize=""></el-input>
            </el-form-item>

            <el-form-item label="后置等待查询语句" prop="wait.new_wait_sql">
              <el-input v-model="Form.wait.new_wait_sql"  type="textarea" autosize=""></el-input>
            </el-form-item>

            <el-form-item label="后置等待数据库运行">
              <el-button @click="run_new_wait_mysql" type="primary" class="el-col-24">运行</el-button>
            </el-form-item>
            <el-form-item label="后置等待数据库查询" prop="wait.new_wait_mysql" >
              <el-select v-model="Form.wait.new_wait_mysql" filterable placeholder="请选择" size="big" value="" class="el-col-24" >
                <el-option
                  v-for="item in mysqls"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="后置等待预期结果" prop="wait.new_wait">
              <el-input v-model="Form.wait.new_wait"  type="textarea" autosize=""></el-input>
            </el-form-item>
            <el-form-item label="后置等待超时设置" prop="wait.new_wait_time" :rules="typeNumber">
              <el-input v-model="Form.wait.new_wait_time"  type="textarea" autosize=""></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="el-col-8">
          <div v-show="sql_config">
            <el-form-item label="前置数据库查询语句" prop="old_sql">
              <el-input v-model="Form.old_sql"  type="textarea" autosize=""></el-input>
            </el-form-item>

            <el-form-item label="前置数据库查询" prop="old_sql_id" >
              <el-select v-model="Form.old_sql_id" filterable placeholder="请选择" size="big" value="" class="el-col-24" >
                <el-option
                  v-for="item in mysqls"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="前置数据库运行">
              <el-button @click="run_old_mysql" type="primary" class="el-col-24">运行</el-button>
            </el-form-item>
            <el-form-item label="前置数据库注册变量" prop="old_sql_regist_variable">
              <el-input v-model="Form.old_sql_regist_variable"  type="textarea" autosize=""></el-input>
            </el-form-item>
            <el-form-item label="前置数据库预期结果" prop="old_sql_hope_result">
              <el-input v-model="Form.old_sql_hope_result"  type="textarea" autosize=""></el-input>
            </el-form-item>

            <el-form-item label="后置数据库查询语句" prop="new_sql">
              <el-input v-model="Form.new_sql"  type="textarea" autosize=""></el-input>
            </el-form-item>
            <el-form-item label="后置数据库查询" prop="new_sql_id" >
              <el-select v-model="Form.new_sql_id" filterable placeholder="请选择" size="big" value="" class="el-col-24" >
                <el-option
                  v-for="item in mysqls"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="后置数据库运行">
              <el-button @click="run_new_mysql" type="primary" class="el-col-24">运行</el-button>
            </el-form-item>
            <el-form-item label="后置数据库注册变量" prop="new_sql_regist_variable">
              <el-input v-model="Form.new_sql_regist_variable"  type="textarea" autosize=""></el-input>
            </el-form-item>
            <el-form-item label="后置数据库预期结果" prop="new_sql_hope_result">
              <el-input v-model="Form.new_sql_hope_result"  type="textarea" autosize=""></el-input>
            </el-form-item>
          </div>
        </div>
        <el-form-item class="center el-col-24">
        <el-switch v-model="wait_config" active-color="#13ce66" inactive-color="#ff4949" active-text="显示" inactive-text="等待条件不显示"
          >
        </el-switch>
        <el-switch
          v-model="sql_config" active-color="#13ce66" inactive-color="#ff4949" active-text="显示"  inactive-text="数据库验证不显示"
         style="margin-left: 50px">
        </el-switch>
      </el-form-item>
      <el-form-item class="el-col-24">
        <el-button type="primary" @click="submitForm('Form')">提交</el-button>
        <el-button @click="test_"  type="primary">运行</el-button>
        <el-button @click="resetForm('Form')">重置</el-button>
        <el-button @click="back">后退</el-button>
      </el-form-item>
    </el-form>
<!--    </div>-->
  </div>
</template>
<script>
  export default {
    name:'case_edit',
    data() {
        var checkName = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('不能为空'));
          }else {
              this.$axios.post('/api/case_validate', {
                  name: value,
                  case_id: this.Form.id})
                  .then(res=>{
                      if(res) {
                          callback();
                      }else{
                          return callback(new Error('名称已存在'));
                      }
                  });
          }
        };
        var checkRegular = (rule, value, callback) => {
          if (!value) {
              callback();
          }else {
              this.$axios.post('/api/regular_validate', {
                  regular: this.Form.regular})
                  .then(res=>{
                      if(res) {
                          callback();
                      }else{
                          return callback(new Error('格式错误'));
                      }
                  });
          }
        };
        var checkHopeWait = (rule, value, callback) => {
            if (value) {
                this.$axios.post('/api/hope_validate', {
                    hope_result: value
                })
                    .then(res => {
                        if (res) {
                            callback();
                        } else {
                            return callback(new Error('格式错误,例如 包含:0'));
                        }
                    });
            }else {callback()}
          };
        var checkHope = (rule, value, callback) => {
          if (!value) {
              return callback(new Error('不能为空'));
          }else {
              this.$axios.post('/api/hope_validate', {
                  hope_result: value})
                  .then(res=>{
                      if(res) {
                          callback();
                      }else{
                          return callback(new Error('格式错误,例如 包含:0'));
                      }
                  });
          }
        };
        return {
            typeNumber:{pattern: /^\d+\d*$/, message: '必须为正整数'},
            is_models:[{id:0,value:'否'},{id:1,value:'是'}],
            value: '',
            groups:this.$store.state.my_all_table['group_list'],
            headers:this.$store.state.my_all_table['header_list'],
            wait_config:true,
            sql_config:true,
            mysqls:this.$store.state.my_all_table['mysql_list'],
            page:1,
            Form: {
                wait:{},
                name: '',
                group_id:1,
                header_id:1,
                method: '',
                url:'',
                data:'',
                regist_variable:'',
                regular:'',
                hope_result:'',
                is_model:0,
                old_sql:'',
                new_sql:'',
                old_sql_regist_variable:'',
                new_sql_regist_variable:'',
                old_sql_hope_result:'',
                new_sql_hope_result:'',
                old_sql_id:null,
                new_sql_id:null,
                old_wait_sql:'',
                old_wait:'',
                old_wait_time:'',
                old_wait_mysql: '',
                new_wait_sql:'',
                new_wait:'',
                new_wait_time:'',
                new_wait_mysql:'',
                testcase_scene_id: null
            },
            rules: {
                name: [{ validator: checkName, trigger: 'blur' }],
                regular: [{ validator: checkRegular, trigger: 'blur' }],
                hope_result:[{ validator: checkHope, trigger: 'blur' }],
                old_sql_hope_result:[{ validator: checkHopeWait, trigger: 'blur' }],
                new_sql_hope_result:[{ validator: checkHopeWait, trigger: 'blur' }],
                wait : {
                    old_wait:[{ validator: checkHopeWait, trigger: 'blur' }],
                    new_wait:[{ validator: checkHopeWait, trigger: 'blur' }],
                }
            },
            labelPosition: 'right'
        };
      },
      methods:{
          lengthCheck(min=0, max=0){
              if(min && !max){return [{ required: true, message: '不可为空', trigger: 'blur' },{min:min, message: '不可少于'+min+'个', trigger: 'blur' }]}
              else if(max && !min){return [{ required: true, message: '不可为空', trigger: 'blur' },{max:max, message: '不可超过'+max+'个', trigger: 'blur' }]}
              else if(max && min){return [{ required: true, message: '不可为空', trigger: 'blur' },{max:max, min:min, message: '长度在'+min+'-'+max+'之间', trigger: 'blur' }]}
              },
          run_old_wait_mysql(){
              this.test_run('mysql_run', {
                  mysql_id : this.Form.wait.old_wait_mysql,
                  sql: this.Form.wait.old_wait_sql,
                  regist_variable : ''
              }, this)
          },
          run_new_wait_mysql(){
              this.test_run('mysql_run', {
                  mysql_id : this.Form.wait.new_wait_mysql,
                  sql: this.Form.wait.new_wait_sql,
                  regist_variable : ''
              }, this)
          },
          run_old_mysql(){
              this.test_run('mysql_run', {
                  mysql_id : this.Form.old_sql_id,
                  sql: this.Form.old_sql,
                  regist_variable : this.Form.old_sql_regist_variable
              }, this)
          },
          run_new_mysql(){
              this.test_run('mysql_run', {
                  mysql_id : this.Form.new_sql_id,
                  sql: this.Form.new_sql,
                  regist_variable : this.Form.new_sql_regist_variable
              }, this)
          },

          getParams(){//接收函数
              console.log('case_edit', this.$route.params)
              if (this.$route.params.id){
                  this.my_get_data(this.$route.params.id, 'case_list', this)
                  console.log('case_edit_refresh', this.Form);
                  return
              }
              if (this.$route.params.row) {
                  this.Form = this.$route.params.row;
              }
              if (this.$route.params){
                // this.groups = this.$route.params.groups;
                // this.headers = this.$route.params.headers;
                // this.mysqls = this.$route.params.mysqls;
                this.page = this.$route.params.page;
              }
          },
          test_(){
              this.test_run('case_run', this.Form, this)
          },
          submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                console.log('push valid', this.page)
                this.Form.case_method = this.value;
                this.$axios.post('/api/case_edit', this.Form)
                    .then(()=> {
                        console.log('push ', this.page, typeof this.page)
                        // if (this.page !== 1){
                        //       this.$router.push({name: 'case_list', params:{page: this.page}})
                        // }else {
                        if(this.Form.testcase_scene_id){this.$router.push('/scene_list')}
                        else {this.$router.push('/case_list')}
                        // }
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
