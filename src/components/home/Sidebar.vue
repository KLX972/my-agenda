<template lang="html">
  <div class="my-sidebar">
    <Datepicker
        v-model="selectedDate"
        name="uniquename"
        :inline="true"
        :language="fr"
    >
    </Datepicker>
  </div>
</template>

<script>
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
      // myDate: this.chosenDate,
      en: en,
      fr: fr
    }
  },
  methods:{
  },
  computed:{
    selectedDate:{
      get: function(){
        return this.chosenDate
      },
      set: function(newValue){
        this.$emit('selectedDate', newValue)
      }
    }
  },
  // watch:{
  //   selectedDate(newValue){
  //     this.$emit('selectedDate', this.selectedDate)
  //   }
  // }
  // mounted(){
  //   let now = new Date('now')
  //   console.log(now);
  // }
}
</script>
