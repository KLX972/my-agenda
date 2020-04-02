// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import VueMoment from 'vue-moment'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import "./filters.js"
import DetailEvent from "@/views/DetailEvent";

library.add(faChevronDown);
library.add(faChevronRight);
library.add(faChevronLeft);
library.add(faTimesCircle);

Vue.component('font-awesome-icon', FontAwesomeIcon);

//Components that can be load in slidingUpModal component
Vue.component('event', DetailEvent);

Vue.config.productionTip = false

// moment french language
const moment = require('moment')
require('moment/locale/fr')
Vue.use(VueMoment, {
    moment
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
