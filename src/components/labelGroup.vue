<script setup>
import LabelAdditional from './labelAdditional.vue'

const props = defineProps({
  textArray: {
    type: Array,
  },
})
let gridStyle
let short
console.log(props.textArray.length)
if (props.textArray.length > 7) {
  gridStyle =
    'w-full md:w-[964px] md:mr-[64px] grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-[32px] md:gap-x-[52px]'
  short = true
} else {
  gridStyle = 'md:w-[652px] md:mr-[64px]'
  short = false
}
</script>

<template>
  <div :class="gridStyle">
    <LabelAdditional :short="short" v-for="item in props.textArray" :text="item"></LabelAdditional>
  </div>
</template>
