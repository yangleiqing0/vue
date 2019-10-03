<template>
  <div class="edit">
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="GroupForm" size="small" status-icon :rules="rules" ref="GroupForm">
      <el-form-item label="分组名称" prop="name">
        <el-input v-model="GroupForm.name"></el-input>
      </el-form-item>
      <el-form-item label="分组备注" prop="description">
        <el-input v-model="GroupForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('GroupForm')">提交</el-button>
        <el-button @click="resetForm('GroupForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name:'group_edit',
    data() {
      var checkUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('名称不能为空'));
        }else {
            callback();
        }
      };
        return {
            GroupForm: {
              name: '',
              description: ''
            },
            rules: {
              name: [
                { validator: checkUserName, trigger: 'blur' }
              ]
            },
            labelPosition: 'right'
        };
      },
      methods:{
            getParams(){//接收函数
                this.GroupForm = this.$route.params;
            },
            submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.$axios.post('/api/group_edit', {
                        'id': this.GroupForm.id,
                        'name': this.GroupForm.name,
                        'description': this.GroupForm.description
              })
                      .then(()=> {
                      this.$router.push('/group_list');

                  })
              }else {
                return false;
              }
            });
          },
            resetForm(formName) {
              this.$refs[formName].resetFields();
            }
        },
      created() {//在模板编译进路由前调用created方法，触发接收函数
          this.getParams();
      }
  }
</script>
