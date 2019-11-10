import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const key = 'user';
const store = new Vuex.Store({
  state () {
    return {
      user: null,
      api:'/api',
      // api: process.env.URL_PATH,
      // api:'http://192.168.1.11:20001/',
      // api:'http://127.0.0.1:5000/',
      // 设置请求的地址
      email_methods:[{key:1, value:'图片'},{key:2, value:'附件'}],
      my_list : ['group', 'header', 'mysql', 'case', 'report', 'scene', 'variable', 'email', 'job'],
      is_start_status:[false,true],
      my_all_table: {
      case_list:[],
      group_list:[],
      header_list:[],
      mysql_list:[],
      report_list:[],
      scene_list:[],
      variable_list:[],
      email_list:[],
      job_list:[],
      },
      case_url:[],
      // 每个数据组可显示与user_id=用户的数据
      model_scenes:[],
      model_cases:[]
    }
  },
  getters: {
    getStorage: function (state) {
      if (!state.user) {
        state.user = JSON.parse(localStorage.getItem(key))
      }
      return state.user
    }
  },
  mutations: {
    $_setStorage (state, value) {
      state.user = value;
      localStorage.setItem(key, JSON.stringify(value))
    },
    $_removeStorage (state) {
      state.user = null;
      localStorage.removeItem(key)
    },
    SetStore(state, data){
      state.my_all_table[data.key] = data.value;
      localStorage.setItem('my_all_table' + data.key, JSON.stringify(data.value))
    },
    SetDate(state, data){
       state[data.key] = data.value;
       if (data.value!==undefined) {
         localStorage.setItem(data.key, JSON.stringify(data.value))
       }

    }
  }
});

export default store
