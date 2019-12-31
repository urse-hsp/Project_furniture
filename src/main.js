import Vue from 'vue'
import App from './App'
import router from './router'
import './reset.css'
import './flexible.js'
import store from './store'
import less from 'less'
Vue.use(less);

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper,);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false;
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
