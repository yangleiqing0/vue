import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import AmazeVue from 'amaze-vue';
import router from "./route";
import store from './store/index'
import Axios from "axios";

import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/gloable.css'
import 'amaze-vue/dist/amaze-vue.css';
import './components/my-common/my-methods'  //全局公用弹窗方法
import './components/my-common/my-var'

// 全局组件
import my_table from "./components/my-common/my_table";
import mail_table from "./components/my-common/my_mailtable";
import my_success_tag from "./components/my-common/my_success_tag";
import my_checkbox from "./components/my-common/my_checkbox";

Vue.use(AmazeVue);

Vue.component('MyTable', my_table);
Vue.component('MyMailTable', mail_table);
Vue.component('MySucTag', my_success_tag);
Vue.component('MyCheckBox', my_checkbox);
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.prototype.$axios = Axios;

Axios.defaults.headers['Content-Type'] = 'application/json';

Axios.interceptors.request.use(res => {
  // 对响应数据做处理
  // console.log("对响应数据做处理")
  if(res.method === 'post'){
    if(that.$root.$user_id !== 0){
      res.data['user_id'] = that.$root.$user_id
    }
  }else{
    console.log(res.baseURL)
  }

  console.log('request',res, res.params, that.$root.$user_id);
  return res

});

Axios.interceptors.response.use(res => {
  // 对响应数据做处理
  // console.log("对响应数据做处理", res)
  if(res.data || res.data ===false){
    res = res.data
  }
  if(res.out){
    that.my_logout(false, res.out)
    console.log('response out', res)
  }else {
    that.my_notify(res);
    console.log('response', res)
  }
  return res;
}, err => {
  // 对响应错误做处理
  if(err.data){
    err = err.data
  }
  that.my_notify(err, true);
  return err;
}
);

let that = new Vue({
  render: h => h(App),
  router,
  store,
  data(){
    return {
    }
  },
  created(){
    if(localStorage.getItem('uid')) {
      this.$root.$user_id = localStorage.getItem('uid')
      this.$root.$user_name = localStorage.getItem('username')
    }else if(this.$root.$user_id === 0 && localStorage.getItem('uid') === null){
       this.$router.push({path:'/login'})
    }
    console.log('uid app:', this.$root.$user_id);
    // this.my_all_request();
  }
}).$mount('#app');

// Axios.defaults.baseURL = 'http://127.0.0.1:5000/';




//  对每一个axios请求进行预处理





router.beforeEach((to, from, next) => {
  console.log('router', that.$root.$user_name);
  /* 路由发生变化修改页面title */
  if(to.path === '/login'){
    next()
  }else {
    if (that.$root.$user_id === 0) {
      that.my_notify('请登录后访问', true);
      next({path: '/login'})
    }else {
      next()
    }
  }
  if (to.meta.title) {
        document.title = to.meta.title
      }
});
