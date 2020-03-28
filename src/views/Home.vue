<template lang="html">
  <div class="home">
    <Navbar :chosenDate="chosenDate" @selectToday="setChosenDate"></Navbar>
    <div class="my-calendar-content">
      <!-- <div class="row"> -->
        <Sidebar :chosenDate="chosenDate" @selectedDate="setChosenDate"></Sidebar>
        <Calendar :chosenDate="chosenDate"></Calendar>
      <!-- </div> -->
    </div>
  </div>

</template>

<script>
import Navbar from '@/components/home/Navbar.vue'
import Sidebar from '@/components/home/Sidebar.vue'
import Calendar from '@/components/home/Calendar.vue'

export default {
  name: 'home',
  components: {
    Navbar,
    Sidebar,
    Calendar
  },
  data(){
    return {
      myDate: new Date()
    }
  },
  methods:{
    setChosenDate(value){
      this.chosenDate = value
    }
  },
  computed:{
    chosenDate:{
      get: function(){
        return this.myDate
      },
      set: function(newValue){
        this.myDate = newValue
      }
    }
  }
}
</script>
