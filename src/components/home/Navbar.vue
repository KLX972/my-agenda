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
    <div class="my-navbar-today-button-content">
      <p class="my-navbar-today-button-text">Aujourd'hui</p>
    </div>
    <div class="my-navbar-change-week-buttons-content">
      <div class="my-navbar-change-week-button-content">
        <font-awesome-icon icon="chevron-left" class="my-navbar-change-week-button-icon"/>
      </div>
      <div class="my-navbar-change-week-button-content">
        <font-awesome-icon icon="chevron-right" class="my-navbar-change-week-button-icon"/>
      </div>
    </div>
    <p class="my-navbar-date">Mars 2020</p>
  </div>
</template>

<script>
import IconBase from '@/components/common/IconBase.vue'
import CalendarIcon from '@/components/common/icons/CalendarIcon.vue'

export default {
  name: 'navbar',
  components: {
    IconBase,
    CalendarIcon
  }
}
</script>
