// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMoment from 'vue-moment'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import "./filters.js"

library.add(faChevronDown);
library.add(faChevronRight);
library.add(faChevronLeft);

Vue.component('font-awesome-icon', FontAwesomeIcon);

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
  components: { App },
  template: '<App/>'
})
