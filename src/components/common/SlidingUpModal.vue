<template lang="html">
    <div class="sliding-up-modal-container" :style="{ height: pageHeight + 'px', top: topByScrollPosition + 'px'}">
        <transition
                name="custom-classes-transition"
                enter-active-class="animated bounceInUp"
                leave-active-class="animated bounceOutDown"
        >
            <div class="sliding-up-modal" id="sliding-up-modal" :style="{height: 'calc(' + pageHeight + 'px - 130px)'}"
                 v-if="slidingActivated">
                <div class="sliding-up-modal-header">
                    <font-awesome-icon icon="times-circle" class="sliding-up-modal-times-circle-hidden"/>
                    <div class="sliding-up-modal-stylish-line"></div>
                    <font-awesome-icon icon="times-circle" class="sliding-up-modal-times-circle"
                                       @click="toggleModalSlidingUp()"/>
                </div>
                <div class="sliding-up-modal-body" id="sliding-up-modal-body" >
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import Vuex from 'vuex'
    import {blurOnModalSlidingUp} from '@/services/modalSlideUp/blurOnModalSlideUpAppear.js'

    export default {
        name: 'slidingUpModal',
        data() {
            return {
                slidingActivated: false,
                pageHeight: 0,
                topByScrollPosition: 0,
            }
        },
        methods: {
            ...Vuex.mapActions('modalSlidingUp', {
                setModalSlidedUp: 'setModalSlidedUp'
            }),
            toggleModalSlidingUp() {
                this.slidingActivated = !this.slidingActivated
                setTimeout(() => {
                    this.setModalSlidedUp()
                    blurOnModalSlidingUp(this.modalSlidedUp)
                }, 650);

            }
        },
        computed: {
            ...Vuex.mapGetters('modalSlidingUp', {
                modalSlidedUp: 'getModalSlidedUp',
            }),
        },
        mounted() {
            this.slidingActivated = true;

            let element = document.body;
            element.classList.add('hide-scroll-window');
            let scrollHeight = document.body.scrollHeight;
            let screenHeight = window.screen.height;
            let positionScrollY = window.scrollY;

            if (scrollHeight < screenHeight) {
                this.pageHeight = screenHeight;
            } else {
                this.pageHeight = scrollHeight;
            }
            this.topByScrollPosition = positionScrollY;

        },
        destroyed() {
            let element = document.body;
            element.classList.remove('hide-scroll-window');
        }
    }
</script>
