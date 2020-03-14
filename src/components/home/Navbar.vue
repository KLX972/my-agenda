<template lang="html">
  <div class="my-navbar">
    <div class="my-navbar-logo-content">
      <IconBase
          icon-name="arrow"
          icon-color="black"
          width="35"
          height="35"
      >
          <CalendarIcon/>
      </IconBase>
    </div>
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
