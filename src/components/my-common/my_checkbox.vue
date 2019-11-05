<template>
  <div class="line-height-normal">
        <el-checkbox :indeterminate="myIsIndeterminate" :index="index" v-model="myCheckAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="myChoose" @change="handleCheckChange">
          <el-checkbox-button checked v-for="data in data_list" :label="data.id" :key="data.id">{{data.name}}</el-checkbox-button>
        </el-checkbox-group>
  </div>
</template>

<script>
    export default {
        name: "my_checkbox",
        props:{
            index:{},
            checkAll:{},
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
                myCheckAll: this.checkAll,
                myChoose: this.choose,
                myIsIndeterminate: this. isIndeterminate,
                mData_list: this.data_list
            }
        },
        methods:{
            handleCheckAllChange(val){
              let test_case = this.data_list;
              let test_case_list = [];
              for(let i=0;i<test_case.length;i++){
                  test_case_list.push(test_case[i].id)
              }
              this.myChoose = val ? test_case_list : [];
              this.myIsIndeterminate = false;
            },
            handleCheckChange(val){
                  let checkedCount = val.length;
                  this.myCheckAll = checkedCount === this.data_list.length;
                  this.myIsIndeterminate = checkedCount > 0 && checkedCount < this.data_list.length;
            },
        },
        watch:{
          isIndeterminate(val){
            this.myIsIndeterminate = val
          },
          myIsIndeterminate(val){
            this.$emit('on-isIndeterminate-change', {val:val, index:this.index})
          },
          choose(val){
            this.myChoose = val
          },
          myChoose(val){
            this.$emit('on-choose-change', {val:val, index:this.index})
          },
          checkAll(val){
            this.myCheckAll = val;
          },
          myCheckAll(val){
            this.$emit('on-checkall-change',{val:val, index:this.index})
          }
        }
    }
</script>

<style scoped>

</style>
