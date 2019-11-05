<template>
  <div>
    <div  v-for="(group, index) in tableData" :key="group.id" >
      <el-button type="primary" plain class="full-width" >{{group.name}}</el-button>
      <MyCheckBox @on-checkall-change="onCheckAllChange" :index="index"
                  :checkAll="group.checkAll" @on-choose-change="onChooseChange"
                  @on-isIndeterminate-change="onIsIndeterminate"
                  :choose="group.choose" v-if="group.testcase_list !== ''"
                  :data_list="group.testcase_list"></MyCheckBox>
    </div>
  </div>
</template>

<script>
    export default {
        name: "request_play",
        data(){
            return{
                tableData:[{choose:[], checkAll:[],testcase_list:[],onIsIndeterminate:true}]
            }
        },
        methods:{
            get_data(){
                this.$axios.get(this.$store.state.api + 'request_play')
                    .then(res=>{
                        this.tableData = res.list;
                        console.log('play', this.tableData)
                    })
            },
            onCheckAllChange(val){
              console.log('onCheckAllChange', val)
              this.tableData[val.index].checkAll = val.val;
            },
            onChooseChange(val){
              console.log('onChooseChange', val)
              this.tableData[val.index].choose = val.val;
            },
            onIsIndeterminate(val){
              this.tableData[val.index].onIsIndeterminate = val.val;
            }
        },
        created() {
            this.get_data()
        }
    }
</script>

<style scoped>

</style>
