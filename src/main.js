import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import router from "./router"

import fastclick from "fastclick"
import 'common/stylus/index.styl'

import VueLazyload from "vue-lazyload"

Vue.use(VueLazyload,{
  loading:require("common/image/default.png")
})
fastclick.attach(document.body)
/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
