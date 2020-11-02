<template lang="html">
  <div class="my-calendar">
    <div class="my-calendar-columns">
      <div class="my-calendar-column":key="indexColumn" v-for="(day,indexColumn) in myWeekCalendar">
        <div class="my-calendar-header-cell" @click="selectNewDay(day.date)">
          <div class="hide-hours-block" v-if="indexColumn === 0"></div>
          <p class="my-calendar-header-cell-title" :class="isSelectedDate(day.date) ? 'active' : '' ">
            {{day.date | moment('ddd') | capitalize}}
          </p>
          <div class="my-calendar-header-cell-subtitle-content"
              :class="isSelectedDate(day.date) ? 'active' : '' ">
            <p class="my-calendar-header-cell-subtitle"
                :class="isSelectedDate(day.date) ? 'active' : '' ">{{day.date | moment('Do')}}</p>
          </div>
        </div>
        <div class="my-calendar-cell-content"
        :class="indexColumn === 0 && indexCell === 0 ? 'first-column first-cell' : indexColumn === 0 && indexCell !== 0 ? 'first-column' : indexColumn !== 0 && indexCell === 0 ? 'first-cell' : ''  "
        :key="indexCell" v-for="(hour,indexCell) in day.hours"
        >
          <div class="my-calendar-cell" @click="showAddEventModal(day.date, hour.hour)">
            <p class="my-calendar-cell-hour" v-if="indexColumn === 0 && indexCell !== 0">{{hour.hour}}</p>
          </div>
          <div class="my-calendar-cell-event-content"
              :style="eventPosition(hour.event[0].startDate,hour.event[0].endDate)" v-if="hour.event.length !==0 "
              @click="showEventModal(hour.event[0].id)"
          >
            <p class="my-calendar-cell-event-title">{{hour.event[0].title}}</p>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'
import SecureLS from "secure-ls";

export default {
  name: 'calendar',
  components: {
  },
  props:{
    chosenDate : Date
  },
  methods:{
    ...Vuex.mapActions('modalSlidingUp', {
      toggleSlidingUpModal: 'toggleSlidingUpModal',
    }),
    showEventModal(eventId) {
      let ls = new SecureLS({encodingType: 'aes', encryptionSecret: 'MAOUHedjnoidnud45'});
      ls.set('eventId', eventId)
      this.toggleSlidingUpModal('detail-event');
    },
    showAddEventModal(dayDate, hour) {
      let ls = new SecureLS({encodingType: 'aes', encryptionSecret: 'MAOUHedjnoidnud45'});
      ls.set('chosenDay', dayDate)
      ls.set('chosenHour', hour)
      this.toggleSlidingUpModal('add-event');

    },
    isSelectedDate(date){
      return (date.getDate() === this.chosenDate.getDate()
        && date.getMonth() === this.chosenDate.getMonth()
        && date.getFullYear() === this.chosenDate.getFullYear()
      )
    },
    eventPosition(startDate,endDate){
      let start = new this.$moment(startDate)
      let end = new this.$moment(endDate)
      let marginTop = 0

      //event duration equal height of the event div because the height of each cell equal 60px
      let eventDuration = end.diff(start,'minutes')

      if (startDate.getMinutes() >= 30) {
        marginTop = 30
      }

      return 'min-height:' + eventDuration + 'px; margin-top :' + marginTop + 'px;'
    },
    selectNewDay(date){
      this.$emit('selectAnotherDay', date)

    }
  },
  computed:{
    ...Vuex.mapGetters('events', {
      getAllEvents: 'getAllEvents',
      getEventsByUser: 'getEventsByUser'
    }),
    ...Vuex.mapGetters('users', {
      getCurrentUser: 'getCurrentUser'
    }),
    myWeekCalendar(){
      let myWeekCalendar = []
      let userEventsTab = this.getEventsByUser(this.getCurrentUser.id)

      for (var i = 0; i < 7; i++) {
        let hoursOfDay = []
        for (var j = 0; j < 24; j++) {
          let hour = {}
          if (j < 10) {
            hour.hour = '0' + j + ':00'
            hoursOfDay[j] = hour
          }else {
            hour.hour = j + ':00'
            hoursOfDay[j] = hour
          }
          hour.event = []
        }

        let myChosenDate = new this.$moment(this.chosenDate)
        let day = {};
        //get each day of the current week
        day.date = myChosenDate.isoWeekday((i+1))._d
        //get hoursTab of the day
        day.hours = hoursOfDay

        if (userEventsTab.length !== 0) {
          let eventsOfTheDay = userEventsTab.filter(element => element.startDate.getDate() === day.date.getDate() && element.startDate.getMonth() === day.date.getMonth() && element.startDate.getFullYear() === day.date.getFullYear())

          for (var k = 0; k < eventsOfTheDay.length; k++) {
            day.hours[eventsOfTheDay[k].startDate.getHours()].event.push(eventsOfTheDay[k])
          }
        }

        myWeekCalendar[i] = day
      }
      return myWeekCalendar
    }
  },
  mounted(){
  }
}
</script>
