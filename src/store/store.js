import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users/users'
import events from './modules/events/events'
import modalSlidingUp from './modules/common/modalSlidingUp'

Vue.use(Vuex);

const myStore = new Vuex.Store({
    modules: {
        users,
        events,
        modalSlidingUp
    },
});

export default myStore
