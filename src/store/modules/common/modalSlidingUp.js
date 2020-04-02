import {blurOnModalSlidingUp} from '@/services/modalSlideUp/blurOnModalSlideUpAppear.js'

const state = {
    modalSlidedUp: false,
    modalSlidingUpContent: ''
};

const mutations = {
    SET_MODAL_SLIDED_UP: (state) => {
        state.modalSlidedUp = !state.modalSlidedUp;
    },
    SET_MODAL_SLIDING_UP_CONTENT: (state, value) => {
        state.modalSlidingUpContent = value;
    }
};
const actions = {
    setModalSlidedUp : (store) => {
        store.commit('SET_MODAL_SLIDED_UP')
    },
    setModalSlidingUpContent : (store, value) => {
        store.commit('SET_MODAL_SLIDING_UP_CONTENT', value)
    },
    toggleSlidingUpModal : (store, value) => {
        store.dispatch('setModalSlidedUp');
        blurOnModalSlidingUp(store.getters.getModalSlidedUp)
        store.dispatch('setModalSlidingUpContent', value)

    }
};

const getters = {
    getModalSlidedUp: state => {
        return state.modalSlidedUp
    },
    getModalSlidingUpContent: state => {
        return state.modalSlidingUpContent
    }
};

export default {
    namespaced : true,
    state: state,
    mutations:mutations,
    actions:actions,
    getters :getters
}
