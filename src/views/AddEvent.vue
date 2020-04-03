<template lang="html">
  <div class="detail-event">
    <div class="tool-box-content hide">
      <div class="tool-box-icon-content">
        <IconBase
            icon-name="edit"
            icon-color="#3E3E3E"
            width="20"
            height="20"
        >
            <EditIcon/>
        </IconBase>
      </div>
      <div class="tool-box-icon-content">
        <IconBase
            icon-name="remove"
            icon-color="#3E3E3E"
            width="20"
            height="20"
        >
            <TrashIcon/>
        </IconBase>
      </div>
    </div>
    <div class="detail-event-content title">
      <IconBase
          icon-name="title"
          icon-color="#FF8090"
          width="25"
          height="25"
      >
          <TitleIcon/>
      </IconBase>
      <input type="text" id="event-title" name="event-title" class="my-agenda-input" v-model="chosenEvent.title" placeholder="Titre">
    </div>
    <div class="detail-event-content">
      <IconBase
          icon-name="timer"
          icon-color="#FF8090"
          width="25"
          height="25"
      >
          <TimerIcon/>
      </IconBase>
       <datepicker
          v-model="chosenEvent.startDate"
          name="startDate"
          id="myEditDatePicker"
          format="dd/MM/yyyy"
          input-class="my-agenda-input"
          ref="datepick"
        >
        </datepicker>
        <select name="start-date" id="start-date-select" class="my-agenda-input select" v-model="startDate">
          <option disabled value="">--Date de départ--</option>
          <option :value="hour":key="index" v-for="(hour,index) in hoursToChoose">{{hour}}
        </option >
        </select>
        <select name="end-date" id="end-date-select" class="my-agenda-input select" v-model="endDate">
          <option disabled value="">--Date de fin--</option>
          <option :value="hour":key="index" v-for="(hour,index) in hoursToChoose">{{hour}}
        </option >
        </select>
    </div>
    <div class="detail-event-content edit">
      <IconBase
          icon-name="report"
          icon-color="#FF8090"
          width="25"
          height="25"
      >
          <ReportIcon/>
      </IconBase>
      <textarea
        name="event-text"
        id="event-text"
        class="my-agenda-input textarea"
        v-model="chosenEvent.text"
        placeholder="Rédiger les détails de l'évènement"
        ></textarea>
    </div>
    <div class="edit-button-content" @click="addMyEvent()">
      <p class="edit-button-text">Valider</p>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'
import SecureLS from "secure-ls";
import IconBase from '@/components/common/IconBase.vue'
import TitleIcon from '@/components/common/icons/TitleIcon.vue'
import TimerIcon from '@/components/common/icons/TimerIcon.vue'
import TrashIcon from '@/components/common/icons/TrashIcon.vue'
import EditIcon from '@/components/common/icons/EditIcon.vue'
import ReportIcon from '@/components/common/icons/ReportIcon.vue'
import Datepicker from 'vuejs-datepicker';
import {blurOnModalSlidingUp} from '@/services/modalSlideUp/blurOnModalSlideUpAppear.js';

export default {
  name: 'addEvent',
  components: {
    IconBase,
    TitleIcon,
    TimerIcon,
    TrashIcon,
    EditIcon,
    ReportIcon,
    Datepicker

  },
  data(){
    return {
      newEvent : {
        startDate : ''
      },
      startDateValue: '',
      endDateValue: ''
    }
  },
  methods:{
    ...Vuex.mapActions('events', {
      addEvent: 'addEvent'
    }),
    ...Vuex.mapActions('modalSlidingUp', {
      setModalSlidedUp: 'setModalSlidedUp'
    }),
    addMyEvent(){
      let startDate = this.startDate
      let endDate = this.endDate

      let startEventHour = 0
      if (startDate.charAt(0) === '0') {
        startEventHour = startDate.charAt(1)
      }else {
        startEventHour = startDate.charAt(0) + startDate.charAt(1)
      }
      let startEventMinutes = 0
      if (startDate.charAt(3) === '0') {
        startEventMinutes = startDate.charAt(4)
      }else {
        startEventMinutes = startDate.charAt(3) + startDate.charAt(4)
      }
      this.chosenEvent.startDate.setHours(Number(startEventHour))
      this.chosenEvent.startDate.setMinutes(Number(startEventMinutes))

      let endEventHour = 0
      if (endDate.charAt(0) === '0') {
        endEventHour = endDate.charAt(1)
      }else {
        endEventHour = endDate.charAt(0) + endDate.charAt(1)
      }
      let endEventMinutes = 0
      if (endDate.charAt(3) === '0') {
        endEventMinutes = endDate.charAt(4)
      }else {
        endEventMinutes = endDate.charAt(3) + endDate.charAt(4)
      }
      let chosenEventDate = this.chosenEvent.startDate.getDate()
      let chosenEventMonth = this.chosenEvent.startDate.getMonth()
      let chosenEventYear = this.chosenEvent.startDate.getFullYear()

      this.chosenEvent.endDate = new Date()

      this.chosenEvent.endDate.setHours(Number(endEventHour))
      this.chosenEvent.endDate.setMinutes(Number(endEventMinutes))
      this.chosenEvent.endDate.setDate(Number(chosenEventDate))
      this.chosenEvent.endDate.setMonth(Number(chosenEventMonth))
      this.chosenEvent.endDate.setFullYear(Number(chosenEventYear))
      this.chosenEvent.user = {id : this.getCurrentUser.id}
      this.chosenEvent.id = this.getAllEvents.length + 1

      this.addEvent(this.chosenEvent)
      this.shutDownModal()
    },
    shutDownModal(){
      this.$parent.slidingActivated = !this.$parent.slidingActivated;
      setTimeout(() => {
        this.setModalSlidedUp();
        blurOnModalSlidingUp(false)
      }, 650);
    }
  },
  computed:{
    ...Vuex.mapGetters('users', {
      getCurrentUser: 'getCurrentUser'
    }),
    ...Vuex.mapGetters('events', {
      getAllEvents: 'getAllEvents'
    }),
    hoursToChoose(){
      let hoursToChoose = []
      for (var i = 0; i < 24; i++) {
        let hour = ''
        if (i < 10) {
          hour = '0' + i
        }else {
          hour = i
        }
        hoursToChoose.push(hour + ':00')
        hoursToChoose.push(hour + ':30')
      }
      return hoursToChoose
    },
    chosenEvent: {
      get: function() {
        return this.newEvent
      },
      set: function(newValue){
        this.newEvent = newValue
      }
    },
    startDate:{
      get: function(){
        return this.startDateValue
      },
      set: function(newValue){
        this.startDateValue = newValue
      }

    },
    endDate:{
      get: function(){
        return this.endDateValue
      },
      set: function(newValue){
        this.endDateValue = newValue
      }
    }
  },
  mounted(){
    let ls = new SecureLS({encodingType: 'aes', encryptionSecret: 'MAOUHedjnoidnud45'});
    this.newEvent.startDate = new Date(ls.get('chosenDay'))
    this.startDate = ls.get('chosenHour')
  }
}
</script>
