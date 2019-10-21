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
      if(!localStorage.getItem('my_all_table'+data.key)) {
        localStorage.setItem('my_all_table' + data.key, JSON.stringify(data.value))
      }
    }
  }
});

export default store
