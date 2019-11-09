<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item   v-for="(group, index) in tableData" :key="index" :name="group.id" :title="group.name">
          <el-badge :value="group.testcase_list.length" type="info" slot="title" class="full-width">
            <el-button   type="primary" plain class="full-width" >{{group.name}}</el-button>
          </el-badge>
          <MyCheckBox @on-checkall-change="onCheckAllChange" :index="index"
                      :checkAll="group.checkAll" @on-choose-change="onChooseChange"
                      @on-isIndeterminate-change="onIsIndeterminate"
                      :choose="group.choose" v-if="group.testcase_list !== ''"
                      :data_list="group.testcase_list"></MyCheckBox>
        </el-collapse-item>
    </el-collapse>
    <el-button type="primary" @click="submitCase">提交</el-button>
    <el-button @click="submitCase">添为任务</el-button>
  </div>
</template>

<script>
    export default {
        name: "request_play",
        data(){
            return{
                activeNames:[],
                tableData:[{choose:[], checkAll:[],testcase_list:[],onIsIndeterminate:false}]
            }
        },
        methods:{
            submitCase(){
              let data = this.tableData;
              let scene_list = [];
              let case_list = [];
              for (let i = 0; i <data.length ; i++) {
                  if (data[i].choose){
                    for (let j = 0; j <data[i].choose.length ; j++) {
                        if(data[i].choose[j][0] === '0'){ case_list.push(data[i].choose[j].substr(1))}else{scene_list.push(data[i].choose[j].substr(1))}
                    }
                  }
              }
              this.$axios.post(this.$store.state.api + 'time_get', {case_list:case_list, scene_list:scene_list})
                  .then(res=>{
                      console.log('time_get', res['time_id'], res['scene_async'])
                      this.$router.push({
                          name: 'request',
                          query:{scene_async:res['scene_async']},
                          params:{
                              id:res['time_id'],
                              case_list:case_list,
                              scene_list:scene_list
                          }
                      })

                  })
              // this.$axios.post(this.$store.state.api + 'request_list',{case_list:case_list, scene_list:scene_list})
              //     .then(res=>)
              // console.log('submitCase:', case_list, scene_list)

            },
            handleChange(val) {
              console.log(val);
            },
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
