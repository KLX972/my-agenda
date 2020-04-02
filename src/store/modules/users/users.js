import Vue from 'vue';

const state = {
    users : [
      {
        id: 1,
        firstName: 'Fabrice',
        lastName: 'Gabriel Calixte',
      },
      {
        id: 2,
        firstName: 'Edward',
        lastName: 'Snowden',
      },
      {
        id: 3,
        firstName: 'Marc',
        lastName: 'Zuckerberg',
      },
      {
        id: 4,
        firstName: 'Jason',
        lastName: 'Bourne',
      },
    ],
    currentUser: {}
};

const mutations = {
  SET_CURRENT_USER: (state, user) => {
    state.currentUser = user;
  },
};
const actions = {
  setCurrentUser : async ( store , userId) => {
    const userFilteredTab = state.users.filter(user => user.id === userId);
    store.commit('SET_CURRENT_USER' , userFilteredTab[0]);
    },
};

const getters = {
    getAllUsers : state => {
        return state.users
    },
    getCurrentUser : state => {
        return state.currentUser
    },
};

export default {
    namespaced : true,
    state: state,
    mutations:mutations,
    actions:actions,
    getters :getters
}
