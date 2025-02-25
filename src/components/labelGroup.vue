<script setup>
import { ref, watch } from 'vue'
import LabelAdditional from './labelAdditional.vue'
import YellowButton from './yellowButton.vue'
import InputLabel from './inputLabel.vue'

const props = defineProps({
  textArray: {
    type: Array,
  },
  customArr: { type: Array, required: false },
})
let gridStyle = ref()
let short = ref()
let userAdditional = ref(props.customArr.length)
let count = ref(new Array(5).fill(0))

watch(() => props.customArr.length, (newLength) => {
  userAdditional.value = newLength
})

const updateStyles = () => {
  count.value = count.value.map(() => 0)
  if (props.textArray.length > 7) {
    gridStyle.value =
      'w-full lg:w-[964px] h-fit lg:mr-[64px] h-fit grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-[32px] md:gap-x-[52px] '
    short.value = true
  } else {
    gridStyle.value =
      'lg:w-[652px] lg:mr-[64px] h-fit w-full grid grid-cols-1 gap-y-5 md:gap-y-[32px] md:gap-x-[52px] '
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
    <InputLabel
      :customArr="props.customArr"
      :count="count"
      :userRoomCount="userAdditional"
    ></InputLabel>
    <YellowButton
      v-if="userAdditional < 5"
      @click="userAdditional++"
      type="button"
      class="w-full"
      text="Добавить другое"
      :arrow="false"
    ></YellowButton>
  </div>
</template>
