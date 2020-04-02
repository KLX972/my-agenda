<template lang="html">
  <div class="my-navbar">
    <div class="my-navbar-logo-content">
      <IconBase
          icon-name="arrow"
          icon-color="#193E34"
          width="35"
          height="35"
      >
          <CalendarIcon/>
      </IconBase>
      <p class="my-navbar-logo-title">Agenda</p>
    </div>
    <div class="my-navbar-today-button-content" @click="chooseToday()">
      <p class="my-navbar-today-button-text">Aujourd'hui</p>
    </div>
    <div class="my-navbar-change-week-buttons-content">
      <p class="my-navbar-change-week-text before">Semaine précédente</p>
      <div class="my-navbar-change-week-button-content" title="semaine précédente" @click="setOneWeekBefore()">
        <font-awesome-icon icon="chevron-left" class="my-navbar-change-week-button-icon"/>
      </div>
      <div class="my-navbar-change-week-button-content" title="semaine suivante" @click="setOneWeekAfter()">
        <font-awesome-icon icon="chevron-right" class="my-navbar-change-week-button-icon"/>
      </div>
      <p class="my-navbar-change-week-text after">Semaine suivante</p>
    </div>
    <p class="my-navbar-date">{{chosenDate | moment("MMMM YYYY" ) | capitalize}}</p>
    <p class="my-navbar-user-selected">{{getCurrentUser.firstName}} {{getCurrentUser.lastName}}</p>
  </div>
</template>

<script>
import Vuex from 'vuex'
import IconBase from '@/components/common/IconBase.vue'
import CalendarIcon from '@/components/common/icons/CalendarIcon.vue'

export default {
  name: 'navbar',
  components: {
    IconBase,
    CalendarIcon
  },
  props:{
    chosenDate: Date
  },
  methods:{
    chooseToday(){
      this.$emit('selectToday', new Date())
    },
    setOneWeekBefore(){
      let oneWeekBefore = new this.$moment(this.chosenDate)
      oneWeekBefore.subtract(7, 'days')
      this.$emit('switchWeek', oneWeekBefore._d)
    },
    setOneWeekAfter(){
      let oneWeekAfter = new this.$moment(this.chosenDate)
      oneWeekAfter.add(7, 'days')
      this.$emit('switchWeek', oneWeekAfter._d)
    }
  },
  computed:{
    ...Vuex.mapGetters('users', {
      getCurrentUser: 'getCurrentUser'
    }),
  }
}
</script>
