<template>
  <div class="edit">
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="140px" :model="CaseForm" size="small" status-icon :rules="rules" ref="CaseForm">
      <el-form-item label="用例名称" prop="name">
        <el-input v-model="CaseForm.name"></el-input>
      </el-form-item>
      <el-form-item label="用例分组" prop="group_id">
        <el-select v-model="CaseForm.group_id" placeholder="请选择" class="el-col-24" value="">
          <el-option
            v-for="item in groups"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请求头部" prop="header_id">
        <el-select v-model="CaseForm.header_id" placeholder="请选择" class="el-col-24" value="">
          <el-option
            v-for="item in headers"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请求方式" prop="method">
        <el-input v-model="CaseForm.method"></el-input>
      </el-form-item>
       <el-form-item label="请求接口" prop="url">
        <el-input v-model="CaseForm.url"></el-input>
      </el-form-item>
       <el-form-item label="注册变量" prop="regist_variable">
        <el-input v-model="CaseForm.regist_variable"></el-input>
      </el-form-item>
      <el-form-item label="注册规则" prop="regular" >
        <el-input v-model="CaseForm.regular" type="textarea" :rows="2"></el-input>
      </el-form-item>
      <el-form-item label="请求报文" prop="data">
        <el-input v-model="CaseForm.data"  type="textarea" :rows="2"></el-input>
      </el-form-item>
      <el-form-item label="预期结果" prop="hope_result">
        <el-input v-model="CaseForm.hope_result"  type="textarea" :rows="2"></el-input>
      </el-form-item>
      <el-form-item label="设置模板" prop="is_model">
        <el-select v-model="CaseForm.is_model" placeholder="请选择" class="el-col-24" value="">
          <el-option
            v-for="item in is_models"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="center">
        <el-switch v-model="wait_config" active-color="#13ce66" inactive-color="#ff4949" active-text="显示" inactive-text="等待条件不显示"
          >
        </el-switch>
        <el-switch
          v-model="sql_config" active-color="#13ce66" inactive-color="#ff4949" active-text="显示"  inactive-text="数据库验证不显示"
         style="margin-left: 50px">
        </el-switch>
      </el-form-item>
      <div v-show="wait_config">
        <el-form-item label="前置等待查询语句" prop="wait.old_wait_sql">
          <el-input v-model="CaseForm.wait.old_wait_sql"  type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="前置等待预期结果" prop="wait.old_wait">
          <el-input v-model="CaseForm.wait.old_wait"  type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="前置等待超时设置" prop="wait.old_wait_time">
          <el-input v-model="CaseForm.wait.old_wait_time"  type="textarea" :rows="2"></el-input>
        </el-form-item>

        <el-form-item label="后置等待查询语句" prop="wait.new_wait_sql">
          <el-input v-model="CaseForm.wait.new_wait_sql"  type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="后置等待预期结果" prop="wait.new_wait">
          <el-input v-model="CaseForm.wait.new_wait"  type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="后置等待超时设置" prop="wait.new_wait_time">
          <el-input v-model="CaseForm.wait.new_wait_time"  type="textarea" :rows="2"></el-input>
        </el-form-item>
      </div>

      <div v-show="sql_config">
        <el-form-item label="前置数据库查询语句" prop="old_sql">
          <el-input v-model="CaseForm.old_sql"  type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="前置数据库注册变量" prop="old_sql_regist_variable">
          <el-input v-model="CaseForm.old_sql_regist_variable"  type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="前置数据库预期结果" prop="old_sql_hope_result">
          <el-input v-model="CaseForm.old_sql_hope_result"  type="textarea" :rows="2"></el-input>
        </el-form-item>

        <el-form-item label="后置数据库查询语句" prop="new_sql">
          <el-input v-model="CaseForm.new_sql"  type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="后置数据库注册变量" prop="new_sql_regist_variable">
          <el-input v-model="CaseForm.new_sql_regist_variable"  type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="后置数据库预期结果" prop="new_sql_hope_result">
          <el-input v-model="CaseForm.new_sql_hope_result"  type="textarea" :rows="2"></el-input>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="primary" @click="submitForm('CaseForm')">提交</el-button>
        <el-button @click="test_">运行</el-button>
        <el-button @click="resetForm('CaseForm')">重置</el-button>
        <el-button @click="back">后退</el-button>
      </el-form-item>
    </el-form>
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
                  case_id: this.CaseForm.id})
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

          }else {
              this.$axios.post('/api/regular_validate', {
                  regular: this.CaseForm.regular})
                  .then(res=>{
                      if(res) {
                          callback();
                      }else{
                          return callback(new Error('格式错误'));
                      }
                  });
          }
        };
        var checkHope = (rule, value, callback) => {
          if (!value) {
              return callback(new Error('不能为空'));
          }else {
              this.$axios.post('/api/hope_validate', {
                  hope_result: this.CaseForm.hope_result})
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
            is_models:[{id:0,value:'否'},{id:1,value:'是'}],
            value: '',
            groups:'',
            headers:'',
            wait_config:false,
            sql_config:false,
            CaseForm: {
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
                old_mysql:null,
                new_mysql:null,
                old_wait_sql:'',
                old_wait:'',
                old_wait_time:'',
                old_wait_mysql:'',
                new_wait_sql:'',
                new_wait:'',
                new_wait_time:'',
                new_wait_mysql:''
            },
            rules: {
                name: [
                  { validator: checkName, trigger: 'blur' }
                ],
                regular: [
                { validator: checkRegular, trigger: 'blur' }
              ],
                hope_result:[
                { validator: checkHope, trigger: 'blur' }
              ],
            },
            labelPosition: 'right'
        };
      },
      methods:{
          getParams(){//接收函数
              if (this.$route.params.row) {
                  this.CaseForm = this.$route.params.row;
              }
              this.groups = this.$route.params.groups;
              this.headers = this.$route.params.headers;
          },
          test_(){
              this.test_run('case_run', this.CaseForm, this)
          },
          submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                this.CaseForm.case_method = this.value;
                this.$axios.post('/api/case_edit', this.CaseForm)
                    .then(()=> {
                    this.$router.push('/case_list');

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
