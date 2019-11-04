<template>
  <div>
    <div  v-for="group in tableData" :key="group.id">
      <el-button type="primary" plain class="full-width" >{{group.name}}</el-button>
      <MyCheckBox ref="choose_list" v-if="group['testcase_list'].length >0" :data_list="group['testcase_list']"></MyCheckBox>
    </div>
  </div>
</template>

<script>
    export default {
        name: "request_play",
        data(){
            return{
                tableData:[]
            }
        },
        methods:{
            get_data(){
                this.$axios.get(this.$store.state.api + 'request_play')
                    .then(res=>{
                        this.tableData = res.list;
                        console.log('play', this.tableData)
                        console.log('choo', this.$refs['choose_list'].choose)
                    })
            }
        },
        created() {
            this.get_data()
        }
    }
</script>

<style scoped>

</style>
