<template lang="html">
  <div class="my-calendar">
    <div class="my-calendar-columns">
      <div class="my-calendar-column":key="indexColumn" v-for="(day,indexColumn) in myWeekCalendar">
        <div class="my-calendar-header-cell" >
          <div class="hide-hours-block" v-if="indexColumn === 0"></div>
          <p class="my-calendar-header-cell-title" :class="activeSelectedDate(day.date) ? 'active' : '' ">
            {{day.date | moment('ddd') | capitalize}}
          </p>
          <div class="my-calendar-header-cell-subtitle-content"
              :class="activeSelectedDate(day.date) ? 'active' : '' ">
            <p class="my-calendar-header-cell-subtitle"
                :class="activeSelectedDate(day.date) ? 'active' : '' ">{{day.date | moment('Do')}}</p>
          </div>
        </div>
        <div class="my-calendar-cell"
              :class="indexColumn === 0 && indexCell === 0 ? 'first-column first-cell' : indexColumn === 0 && indexCell !== 0 ? 'first-column' : indexColumn !== 0 && indexCell === 0 ? 'first-cell' : ''  "
              :key="indexCell" v-for="(hour,indexCell) in day.hours"
        >
          <p class="my-calendar-cell-hour" v-if="indexColumn === 0 && indexCell !== 0">{{hour}}</p>

        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'calendar',
  components: {
  },
  props:{
    chosenDate : Date
  },
  data(){
    return {
    }
  },
  methods:{
    activeSelectedDate(date){
      return (date.getDate() === this.chosenDate.getDate()
        && date.getMonth() === this.chosenDate.getMonth()
        && date.getFullYear() === this.chosenDate.getFullYear()
      )
    }
  },
  computed:{
    myWeekCalendar(){
      // let myChosenDate = new this.$moment(this.chosenDate)
      let myWeekCalendar = []
      let days = []
      let hoursOfDay = []
      let eventsTab = []

      for (var i = 0; i < 24; i++) {
        if (i < 10) {
          hoursOfDay[i] = '0' + i + ':00'
        }else {
          hoursOfDay[i] = i + ':00'
        }

      }

      for (var i = 0; i < 7; i++) {
        let myChosenDate = new this.$moment(this.chosenDate)
        let day = {};
        //get each  of the current week
        day.date = myChosenDate.isoWeekday((i+1))._d
        //get hoursTab of the day
        day.hours = hoursOfDay

        myWeekCalendar[i] = day
      }
      return myWeekCalendar
    }
  },
  mounted(){
    // let test = new this.$moment(this.chosenDate)
    // console.log(test.subtract(3, 'days'));
    // console.log(test.isoWeekday((5+1))._d,test.isoWeekday((6+1))._d);


  }
}
</script>
