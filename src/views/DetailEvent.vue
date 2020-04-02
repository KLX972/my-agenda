<template lang="html">
  <div class="detail-event">
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
    <div class="detail-event-content">
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
// import Navbar from '@/components/home/Navbar.vue'
// import Sidebar from '@/components/home/Sidebar.vue'
// import Calendar from '@/components/home/Calendar.vue'

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
    // ...Vuex.mapActions('users', {
    //   setCurrentUser: 'setCurrentUser'
    // }),
    // setChosenDate(value){
    //   this.chosenDate = value
    // }
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
