<script setup>
import { ref, watch } from 'vue'
import LabelAdditional from './labelAdditional.vue'
import YellowButton from './yellowButton.vue'

const props = defineProps({
  textArray: {
    type: Array,
  },
})
let gridStyle = ref()
let short = ref()
const updateStyles = () => {
  if (props.textArray.length > 7) {
    gridStyle.value =
      'w-full md:w-[964px] md:mr-[64px] grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-[32px] md:gap-x-[52px] md:h-[598px]'
    short.value = true
  } else {
    gridStyle.value = 'md:w-[652px]  md:mr-[64px]'
    short.value = false
  }
}

// Initial check
updateStyles()

// Watch for changes in textArray
watch(() => props.textArray, updateStyles, { deep: true })
</script>

<template>
  <div :class="gridStyle">
    <LabelAdditional :short="short" v-for="item in props.textArray" :text="item"></LabelAdditional>
    <YellowButton type="button" class="w-full" text="Добавить другое" :arrow="false"></YellowButton>
  </div>
</template>
