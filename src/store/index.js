import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const key = 'user';
const store = new Vuex.Store({
  state () {
    return {
      user: null,
      my_all_table: {
      case_list:[],
      group_list:[],
      header_list:[],
      mysql_list:[],
      report_list:[],
      scene_list:[],
      variable_list:[],
      email_list:[]
      },
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
       localStorage.setItem(data.key, JSON.stringify(data.value))

    }
  }
});

export default store
