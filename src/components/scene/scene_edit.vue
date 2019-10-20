<template>
  <div class="edit">
    <div class="_edit edit-inner">
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="SceneForm" size="small" status-icon :rules="rules" ref="SceneForm">
      <el-form-item label="场景名称" prop="name">
        <el-input v-model="SceneForm.name"></el-input>
      </el-form-item>
       <el-form-item label="场景分组" prop="group_id">
          <el-select v-model="SceneForm.group_id" placeholder="请选择" class="el-col-24" size="big" value="">
            <el-option
              v-for="item in groups"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="场景备注" prop="description">
        <el-input v-model="SceneForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('SceneForm')">提交</el-button>
        <el-button @click="resetForm('SceneForm')">重置</el-button>
        <el-button @click="back">后退</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name:'scene_edit',
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }else {
            this.$axios.post('/api/scene_validate', {
                name: value,
                scene_id: this.SceneForm.id})
                .then(res=>{
                    if(res) {
                        callback();
                    }else{
                        return callback(new Error('名称已存在'));
                    }
                });
        }
      };
        return {
            groups:'',
            model_scenes:'',
            model_cases:'',
            SceneForm: {
              name: '',
                group_id:1,
              description: ''
            },
            rules: {
              name: [
                { validator: checkName, trigger: 'blur' }
              ]
            },
            labelPosition: 'right'
        };
      },
      methods:{
          getParams(){//接收函数
              if (this.$route.params.row) {
                  this.SceneForm = this.$route.params.row;
              }
              this.groups = this.$route.params.groups;
              this.model_scenes = this.$route.params.model_scenes;
              this.model_cases = this.$route.params.model_cases;
          },
          submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$axios.post('/api/scene_edit', this.SceneForm)
                    .then(()=> {
                    this.$router.push('/scene_list');

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
