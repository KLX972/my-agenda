<template lang="html">
  <div class="my-sidebar">
    <Datepicker
        v-model="selectedDate"
        name="uniquename"
        :inline="true"
        :language="fr"
    >
    </Datepicker>
    <div class="my-sidebar-list-users-content">
      <p class="my-sidebar-list-users-title">Utilisateurs</p>
      <div class="my-sidebar-list-users-user-content" :key="user.id" v-for="user in getAllUsers">
        <input type="radio" v-model="userPicked" name="chooseUser" :id="user.id" :value="user.id" class="user-choice-radio">
        <label :for="user.id" class="user-choice-label" @click="setCurrentUser(user.id)"></label>
          <p class="my-sidebar-list-users-user" :class="userPicked === user.id ? 'active' : '' "> {{user.firstName}} {{user.lastName}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'
import IconBase from '@/components/common/IconBase.vue'
import CalendarIcon from '@/components/common/icons/CalendarIcon.vue'
import Datepicker from 'vuejs-datepicker';
import {en, fr} from 'vuejs-datepicker/dist/locale'

export default {
  name: 'sidebar',
  components: {
    IconBase,
    CalendarIcon,
    Datepicker
  },
  props:{
    chosenDate : Date
  },
  data(){
    return {
      userPicked : false,
      en: en,
      fr: fr
    }
  },
  methods:{
    ...Vuex.mapActions('users', {
      setCurrentUser: 'setCurrentUser'
    }),
  },
  computed:{
    ...Vuex.mapGetters('users', {
      getAllUsers: 'getAllUsers',
      getCurrentUser: 'getCurrentUser'
    }),
    selectedDate:{
      get: function(){
        return this.chosenDate
      },
      set: function(newValue){
        this.$emit('selectedDate', newValue)
      }
    },
    // userSelected{
    //   get: function(){
    //     return this.userPicked
    //   },
    //   set: function(newValue){
    //     this.userPicked = newValue
    //   }
    // }
  },
  watch:{
    getCurrentUser(newValue){
      this.userPicked = newValue.id
    }
  },
}
</script>
