<template lang="html">
  <div class="detail-event">
    <div class="tool-box-content">
      <div class="tool-box-icon-content" @click="displayEditView()">
        <IconBase
            icon-name="edit"
            icon-color="#3E3E3E"
            width="20"
            height="20"
        >
            <EditIcon/>
        </IconBase>
      </div>
      <div class="tool-box-icon-content" @click="removeMyEvent()">
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
      <p class="detail-event-title">{{chosenEvent.title}}</p>
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
      <p class="detail-event-hours">
        {{chosenEvent.startDate | moment("dddd Do MMMM YYYY ") | capitalize}} , {{chosenEvent.startDate | moment("hh:mm")}} - {{chosenEvent.endDate | moment("hh:mm")}}
       </p>
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
      <p class="detail-event-text">{{chosenEvent.text}}</p>
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
import {blurOnModalSlidingUp} from '@/services/modalSlideUp/blurOnModalSlideUpAppear.js';

export default {
  name: 'detailEvent',
  components: {
    IconBase,
    TitleIcon,
    TimerIcon,
    TrashIcon,
    EditIcon,
    ReportIcon

  },
  // data(){
    // return {
    //   myDate: new Date()
    // }
  // },
  methods:{
    ...Vuex.mapActions('modalSlidingUp', {
      setModalSlidingUpContent: 'setModalSlidingUpContent',
      setModalSlidedUp: 'setModalSlidedUp'
    }),
    ...Vuex.mapActions('events', {
      removeEvent: 'removeEvent'
    }),
    displayEditView(){
      this.setModalSlidingUpContent('edit-event')
    },
    removeMyEvent(){
      this.removeEvent(this.chosenEvent)
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
    ...Vuex.mapGetters('events', {
      getEventById: 'getEventById'
    }),
    chosenEvent(){
      let ls = new SecureLS({encodingType: 'aes', encryptionSecret: 'MAOUHedjnoidnud45'});
      return this.getEventById(ls.get('eventId'))[0];
    }
    // chosenDate:{
    //   get: function(){
    //     return this.myDate
    //   },
    //   set: function(newValue){
    //     this.myDate = newValue
    //   }
    // }
  },
  mounted(){
    let ls = new SecureLS({encodingType: 'aes', encryptionSecret: 'MAOUHedjnoidnud45'});
    this.getEventById(ls.get('eventId'));
  }
}
</script>
