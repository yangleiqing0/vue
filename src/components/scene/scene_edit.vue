<template>
  <div class="edit">
    <div class="_edit edit-inner">
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="Form" size="small" status-icon :rules="rules" ref="Form">
      <el-form-item label="场景名称" prop="name">
        <el-input v-model="Form.name"></el-input>
      </el-form-item>
       <el-form-item label="场景分组" prop="group_id">
          <el-select v-model="Form.group_id" filterable placeholder="请选择" class="el-col-24" size="big" value="">
            <el-option
              v-for="item in groups"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="场景备注" prop="description">
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
    name:'scene_edit',
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }else {
            this.$axios.post('/api/scene_validate', {
                name: value,
                scene_id: this.Form.id})
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
            groups: this.$store.state.my_all_table['group_list'],
            model_scenes:'',
            model_cases:'',
            Form: {
              name: '',
              group_id: 1,
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
                  console.log('scene_edit', this.$route.params.row);
                  this.Form = this.$route.params.row;
              }
              if (this.$route.params.id && this.$route.params.row === undefined){
                  this.my_get_data(this.$route.params.id, 'scene_list', this)
                  console.log('scene_edit_refresh', this.Form, this.groups, this.$store.state.my_all_table['group_list']);
              }
          },
          submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$axios.post('/api/scene_edit', this.Form)
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
