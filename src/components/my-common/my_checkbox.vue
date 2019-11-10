<template>
  <div class="line-height-normal">
        <el-checkbox class="margin-left-10" v-if="data_list.length>0" :indeterminate="myIsIndeterminate" :index="index" v-model="myCheckAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group  v-model="myChoose" @change="handleCheckChange">
          <template v-for="(data,index) in data_list" >
            <div class=" el-col-6" style="display: inline-block;padding:0 60px 0 40px" >
              <el-badge :value="data['is_testcase_scene']===1?'场景':'用例'"
                        :type="data['is_testcase_scene']===1?'primary':'success'"
                        class="item margin-top-10 el-col-24"   >
                <!--                根据 用例是否为场景来添加首字符为0/1，后面数字为对应的id-->
                <el-checkbox-button class="el-col-24" :label="data['is_testcase_scene']+''+data.id" :key="index">
                  {{data.name}}
                  <i :title="data['is_testcase_scene']===1?'提升场景排序名次':'提升用例排序名次'" class="am-icon-arrow-up am-icon-fw"
                     :style="data['is_testcase_scene']===1?'color: #409EFF;position: absolute;left: 3px;top:25%':'color: #67C23A;position: absolute;left: 3px;top:25%'"
                     @click.prevent="up(data)"
                  ></i>
                </el-checkbox-button>
              </el-badge>
            </div>
          </template>
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
                myHandleOnload:0,
                myCheckAll: this.checkAll,
                myChoose: this.choose,
                myIsIndeterminate: this. isIndeterminate,
                mData_list: this.data_list
            }
        },
        methods:{
            up(data){
                console.log('data:', data)
                if(data['is_testcase_scene']===1){
                    this.$axios.post(this.$store.state.api + 'scene_up', {id:data.id})
                    .then(res=>{
                        if(res){
                            this.myHandleOnload += 1;
                        }
                    })
                }else{
                    this.$axios.post(this.$store.state.api + 'case_up', {id:data.id})
                    .then(res=>{
                        if(res){
                            this.myHandleOnload += 1;
                        }
                    })
                }
            },
            handleCheckAllChange(val){
              let test_case = this.data_list;
              let test_case_list = [];
              for(let i=0;i<test_case.length;i++){
                  test_case_list.push(test_case[i]['is_testcase_scene']+''+test_case[i].id)
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
          },
          myHandleOnload(val){
            this.$emit('on-onload-change', val)
          }
        }
    }
</script>

<style >

</style>
