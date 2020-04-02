import Vue from 'vue';

const state = {
    events : [
      {
        id: 1,
        user:{
          id: 1
        },
        title: 'Rdv Zelty',
        startDate: new Date('2020-03-30 10:00:00'),
        endDate: new Date('2020-03-30 10:30:00'),
        text: 'Rendez-vous avec Marc de Zelty pour faire un bilan de l\'application et discuter de la suite'
      },
      {
        id: 2,
        user:{
          id: 1
        },
        title: 'Réunion fin Covid-19',
        startDate: new Date('2020-04-02 08:30:00'),
        endDate: new Date('2020-04-02 10:30:00'),
        text: 'Faire le point générale sur toutes les tâches à reprendre'
      },
      {
        id: 3,
        user:{
          id: 2
        },
        title: 'Réunion fin Covid-19',
        startDate: new Date('2020-04-02 08:00:00'),
        endDate: new Date('2020-04-02 08:30:00'),
        text: 'Faire le point générale sur toutes les tâche à reprendre'
      },

    ]
};

const mutations = {
  UPDATE_EVENTS: (state, events) => {
    state.events = events;
  },
};
const actions = {
  setEvents : async ( store , event) => {
    let eventsTab = state.events
    // const eventsTabFilteredTab = state.eventsTab.filter(previousEvent => previousEvent.id === event.id);

    const isInEventsTab = (element) => element.id === event.id;
    let indexToReplace = eventsTab.findIndex(isInEventsTab)

    eventsTab.splice(indexToReplace, 1, event);
    store.commit('UPDATE_EVENTS' , eventsTab);
    },
};

const getters = {
    getAllEvents : state => {
        return state.events
    },
    getEventsByUser :(state) => (userId) => {
        return state.events.filter(event => event.user.id === userId);
    },
    getEventById :(state) => (eventId) => {
        return state.events.filter(event => event.id === eventId);
    },

};

export default {
    namespaced : true,
    state: state,
    mutations:mutations,
    actions:actions,
    getters :getters
}