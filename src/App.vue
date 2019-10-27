<template>
  <div id="app">
      <home></home>
  </div>
</template>

<script>
    import home from "./components/home/home";

export default {
    name: 'app',
    components: {
        home:home
    },
    data() {
          return{
          }
      },
    methods: {

    },
    created() {
        console.log('app created')
        let keys = ['api', 'model_cases', 'model_scenes', 'email_methods'];
        for(let i=0;i<keys.length;i++){
            this.my_get_localStore(keys[i])
        }
        if(this.$store.state.my_all_table['group_list'].length === 0){
            if(localStorage.getItem('my_all_table'+'group_list')){
                 this.$store.state.my_all_table['group_list'] = JSON.parse(localStorage.getItem('my_all_table'+'group_list'))
            }
        }
        if(this.$store.state.my_all_table['header_list'].length === 0){
            if(localStorage.getItem('my_all_table'+'header_list')){
                 this.$store.state.my_all_table['header_list'] = JSON.parse(localStorage.getItem('my_all_table'+'header_list'))
            }
        }
        if(this.$store.state.my_all_table['mysql_list'].length === 0){
            if(localStorage.getItem('my_all_table'+'mysql_list')){
                 this.$store.state.my_all_table['mysql_list'] = JSON.parse(localStorage.getItem('my_all_table'+'mysql_list'))
            }
        }
    }
}
</script>

<style>

</style>
