<template lang="html">
  <div class="home">
    <Navbar :chosenDate="chosenDate" @selectToday="setChosenDate"></Navbar>
    <div class="container-fluid">
      <div class="row">
        <Sidebar :chosenDate="chosenDate" @selectedDate="setChosenDate"></Sidebar>
      </div>
    </div>
  </div>

</template>

<script>
import Navbar from '@/components/home/Navbar.vue'
import Sidebar from '@/components/home/Sidebar.vue'

export default {
  name: 'home',
  components: {
    Navbar,
    Sidebar
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
