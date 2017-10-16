// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {
  store
} from './Store/Store'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path !== "/") {
    let token = sessionStorage.getItem("token");
    if (!token) {
      console.log("no token found");
      return next("/");
    }
    axios.defaults.headers.common['Authorization'] = token;
    axios.get("https://intense-castle-52320.herokuapp.com/token-verify").then((res) => {
      if (res.data.valid === true) {
        return next();
      }
      return next("/");
    });
  }
  next();
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
