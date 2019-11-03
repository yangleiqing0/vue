<template>
  <div class="edit">
    <div class="_edit edit-inner">
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="120px" :model="Form" size="small" status-icon :rules="rules" ref="Form">
      <el-form-item label="任务名称" prop="name">
        <el-input v-model="Form.name"></el-input>
      </el-form-item>
       <el-form-item label="任务用例" class="left">
        <el-input value="去除勾选即从任务删除" disabled></el-input>
        <el-checkbox :indeterminate="isCaseIndeterminate" v-model="checkAllCase" @change="handleCheckAllCaseChange">全选</el-checkbox>
        <el-checkbox-group v-model="choose_cases" @change="handleCheckCaseChange">
          <el-checkbox-button checked v-for="__case in Form.testcases" :label="__case.id" :key="__case.id">{{__case.name}}</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
       <el-form-item label="任务场景" class="left">
        <el-input value="去除勾选即从任务删除" disabled></el-input>
          <el-checkbox :indeterminate="isSceneIndeterminate" v-model="checkAllScene" @change="handleCheckAllSceneChange">全选</el-checkbox>
         <el-checkbox-group v-model="choose_scenes" @change="handleCheckSceneChange">
          <el-checkbox-button checked v-for="__scene in Form.testcase_scenes" :label="__scene.id" :key="__scene.id">{{__scene.name}}</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
       <el-form-item label="任务备注" prop="description">
        <el-input v-model="Form.description"></el-input>
      </el-form-item>
      <el-form-item label="定时开关" prop="is_start" style="text-align: left;">
          <el-switch v-model="Form.is_start" active-color="#13ce66" inactive-color="#ff4949" active-text="开启" inactive-text="关闭"
          ></el-switch>
      </el-form-item>
      <el-form-item label="触发器类型" prop="triggers">
        <el-input v-model="Form.triggers"></el-input>
      </el-form-item>
      <el-form-item label="cron表达式" prop="cron">
        <el-input v-model="Form.cron"></el-input>
      </el-form-item>
      <el-form-item label="邮件配置" prop="mail_id">
        <el-select v-model="Form.mail_id" filterable placeholder="请选择" class="el-col-24" value="">
          <el-option
            v-for="item in emails"
            :key="item.id"
            :label="item.name"
            :value="item.id">
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
    name:'job_edit',
    data() {
      var checkName = (rule, value, callback) => {

        if (!value) {
          return callback(new Error('不能为空'));
        }else {
            this.$axios.post('/api/job_validate', {
                name: value,
                job_id: this.Form.id
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
            emails:this.$store.state.my_all_table['email_list'],
            choose_cases:[],
            choose_scenes:[],
            checkAllCase: true,
            checkAllScene: true,
            isCaseIndeterminate: false,
            isSceneIndeterminate: false,
            Form: {
                name: '',
                testcases:[],
                testcase_scenes:[],
                description:'',
                is_start: 0,
                triggers:'',
                cron: '',
                mail_id: 1,
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
            handleCheckCaseChange(val){
                  console.log('handleCheckCaseChange', val)
                  let checkedCount = val.length;
                  this.checkAllCase = checkedCount === this.Form.testcases.length;
                  this.isCaseIndeterminate = checkedCount > 0 && checkedCount < this.Form.testcases.length;
            },
           handleCheckSceneChange(val){
                  let checkedCount = val.length;
                  this.checkAllScene = checkedCount === this.Form.testcase_scenes.length;
                  this.isSceneIndeterminate = checkedCount > 0 && checkedCount < this.Form.testcase_scenes.length;
            },
            handleCheckAllCaseChange(val) {
              let test_case = this.Form.testcases;
              let test_case_list = [];
              for(let i=0;i<test_case.length;i++){
                  test_case_list.push(test_case[i].id)
              }
              this.choose_cases = val ? test_case_list : [];
              this.isCaseIndeterminate = false;
              console.log('allcheck', this.choose_cases)
            },
          handleCheckAllSceneChange(val) {
              let scenes = this.Form.testcase_scenes;
              let scene_list = [];
              for(let i=0;i<scenes.length;i++){
                  scene_list.push(scenes[i].id)
              }
              this.choose_scenes = val ? scene_list : [];
              this.isSceneIndeterminate = false;
              console.log('allcheck', this.choose_scenes)
            },
            getParams(){//接收函数
               if (this.$route.params.row) {
                  this.Form = this.$route.params.row;
                  this.Form.is_start = (this.Form.is_start !== 0);
              }
                console.log('job', this.Form)
                if (this.$route.params.id && this.$route.params.row === undefined){
                  this.my_get_data(this.$route.params.id, 'job_list', this)
                  console.log('job_edit_refresh', this.Form, this.choose_cases);
              }
            },
            submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.Form.testcases = this.choose_cases;
                  this.Form.testcase_scenes = this.choose_scenes;
                  this.$axios.post('/api/job_edit',
                        this.Form
              )
                      .then(()=> {
                      this.$router.push('/job_list');

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
