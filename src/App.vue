<template>
  <div id="app">
    <div id="zone-to-blur">
      <router-view/>
    </div>
    <SlidingUpModal v-if="modalSlidedUp">
        <component :is="modalSlidingUpContent"></component>
    </SlidingUpModal>
  </div>
</template>

<script>
import Vuex from 'vuex'
import SlidingUpModal from '@/components/common/SlidingUpModal.vue'

export default {
  name: 'App',
  components: {
    SlidingUpModal
  },
  computed: {
    ...Vuex.mapGetters('modalSlidingUp', {
      modalSlidedUp: 'getModalSlidedUp',
      modalSlidingUpContent: 'getModalSlidingUpContent',
    }),
    layout() {
        return (this.$route.meta.layout || default_layout);
    },
    isMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(navigator.userAgent)) {
            return true
        } else {
            return false
        }
    },
  },
  mounted(){
    let searchClassTest = 'blurZone';
    let observerTest = new MutationObserver(
       function( mutationsTest ) {
          let currentClassTest = mutationsTest[0].target.className;
          if( mutationsTest[0].attributeName === 'class' ) {
              let elmtTest = document.getElementById("zone-to-blur");
             if ( currentClassTest.indexOf( searchClassTest ) >= 0 ) {
                elmtTest.style.filter = "blur(5px)";
             }
             else {
                elmtTest.style.filter = "none";
             }
          }
       });

    let myHtmlElementTest = document.querySelector('#zone-to-blur');
    observerTest.observe( myHtmlElementTest,  {
       attributes: true
    });
  }
}
</script>

<style lang="scss">
    @import '../node_modules/bootstrap/scss/bootstrap.scss';
    @import './assets/styles/main.scss';
</style>
