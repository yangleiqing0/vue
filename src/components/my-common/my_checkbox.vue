<template>
  <div class="line-height-normal">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="choose" @change="handleCheckChange">
          <el-checkbox-button checked v-for="data in data_list" :label="data.id" :key="data.id">{{data.name}}</el-checkbox-button>
        </el-checkbox-group>
  </div>

</template>

<script>
    export default {
        name: "my_checkbox",
        props:{
            checkAll:{default: true, type: Boolean},
            isIndeterminate:{default: false, type: Boolean},
            choose:{
                default: function() {
                  return [];
                }
                },
            data_list:{
                default: function() {
                  return [];
                }
                },
        },
        data(){
            return{

            }
        },
        methods:{
            handleCheckAllChange(val){
              let test_case = this.data_list;
              let test_case_list = [];
              for(let i=0;i<test_case.length;i++){
                  test_case_list.push(test_case[i].id)
              }
              this.choose = val ? test_case_list : [];
              this.isIndeterminate = false;
            },
            handleCheckChange(val){
                  let checkedCount = val.length;
                  this.checkAll = checkedCount === this.data_list.length;
                  this.isIndeterminate = checkedCount > 0 && checkedCount < this.data_list.length;
            },
        }
    }
</script>

<style scoped>

</style>
