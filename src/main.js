import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import AmazeVue from 'amaze-vue';
import router from "./route";

import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/gloable.css'
import 'amaze-vue/dist/amaze-vue.css';
import './components/my-common/my-notification'  //全局公用弹窗方法

Vue.use(AmazeVue);

import Axios from "axios";

// Axios.defaults.baseURL = 'http://127.0.0.1:5000/';

Vue.config.productionTip = false;

Vue.use(ElementUI);


Vue.prototype.$axios = Axios;



new Vue({
  render: h => h(App),
  router:router
}).$mount('#app');

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */

  if(to.path !== from.path) {

    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()
  }
});
