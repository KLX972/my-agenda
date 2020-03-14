<template>
    <svg xmlns="http://www.w3.org/2000/svg"
         :width="width"
         :height="height"
         :viewBox="viewBox"
         :aria-labelledby="iconName"
         role="presentation"
    >
        <title :id="iconName">{{iconName}} icon </title>

    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
    export default {
        props: {
            iconName: {
                type: String,
                default: 'box'
            },
            width: {
                type: [Number, String],
                default: 18
            },
            height: {
                type: [Number, String],
                default: 18
            },
            iconColor: {
                type: String,
                default: 'currentColor'
            },
            viewBox: {
                type: String,
                default: '0 0 31 31'
            }
        }
    }
</script>

<style scoped>
    svg {
        display: inline-block;
        vertical-align: baseline;
    }
</style>
