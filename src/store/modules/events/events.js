import Vue from 'vue';

const state = {
    events : [
      {
        id: 1,
        user:{
          id: 1
        },
        title: 'Rdv Zelty',
        startDate: new Date('2020-04-06 07:30:00'),
        endDate: new Date('2020-04-06 08:30:00'),
        text: 'Rendez-vous avec Marc de Zelty pour faire un bilan de l\'application et discuter de la suite'
      },
      {
        id: 2,
        user:{
          id: 1
        },
        title: 'Réunion fin Covid-19',
        startDate: new Date('2020-04-08 08:30:00'),
        endDate: new Date('2020-04-08 10:30:00'),
        text: 'Faire le point générale sur toutes les tâches à reprendre'
      },
      {
        id: 3,
        user:{
          id: 2
        },
        title: 'Réunion fin Covid-19',
        startDate: new Date('2020-04-09 07:00:00'),
        endDate: new Date('2020-04-09 07:30:00'),
        text: 'Faire le point générale sur toutes les tâches à reprendre'
      },
      {
        id: 4,
        user:{
          id: 2
        },
        title: 'Envoi test Zelty',
        startDate: new Date('2020-04-03 07:00:00'),
        endDate: new Date('2020-04-09 08:30:00'),
        text: 'Avancer le plus possible les tâches en cour et envoyer le projet à Marc de Zelty'
      },

    ]
};

const mutations = {
  UPDATE_EVENTS: (state, events) => {
    state.events = events;
  },
  ADD_EVENT: (state, myEvent) => {
    state.events.push(myEvent);
  },
  REMOVE_EVENT: (state, index) => {
    state.events.splice(index, 1);
  },
};
const actions = {
  updateEvents : async ( store , event) => {
    let eventsTab = state.events

    const isInEventsTab = (element) => element.id === event.id;
    let indexToReplace = eventsTab.findIndex(isInEventsTab)

    eventsTab.splice(indexToReplace, 1, event);
    store.commit('UPDATE_EVENTS' , eventsTab);
    },

  removeEvent : async ( store , event) => {
    const isInEventsTab = (element) => element.id === event.id;
    let indexToRemove = state.events.findIndex(isInEventsTab)
    store.commit('REMOVE_EVENT' , indexToRemove)
    },

  addEvent : async ( store , myEvent) => {
    store.commit('ADD_EVENT' , myEvent);
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
