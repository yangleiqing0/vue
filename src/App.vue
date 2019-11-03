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
        let keys = ['api', 'model_cases', 'model_scenes', 'email_methods', 'is_start_status'];
        for (let i = 0; i < keys.length; i++) {
            this.my_get_localStore(keys[i])
        }
        let my_list = ['group', 'header', 'mysql', 'case', 'report', 'scene', 'variable', 'email', 'job'];
        for (let i = 0; i < my_list.length; i++) {
            let list_name = my_list[i] + '_list';
            if (this.$store.state.my_all_table[list_name].length === 0) {
                if (localStorage.getItem('my_all_table' + list_name)) {
                    this.$store.state.my_all_table[list_name] = JSON.parse(localStorage.getItem('my_all_table' + list_name))
                }
            }
        }
    }
}
</script>

<style>

</style>
