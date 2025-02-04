<script setup>
import { ref, watch } from 'vue'
import LabelAdditional from './labelAdditional.vue'
import YellowButton from './yellowButton.vue'
import InputLabel from './inputLabel.vue'

const props = defineProps({
  textArray: {
    type: Array,
  },
})
let gridStyle = ref()
let short = ref()
let userAdditional = ref(0)
let count = ref(new Array(5).fill(0))

const updateStyles = () => {
  count.value = count.value.map(() => 0)
  userAdditional.value = 0
  if (props.textArray.length > 7) {
    gridStyle.value =
      'w-full md:w-[964px] h-fit md:mr-[64px] h-fit grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-[32px] md:gap-x-[52px] '
    short.value = true
  } else {
    gridStyle.value =
      'md:w-[652px] md:mr-[64px] h-fit w-full grid grid-cols-1 gap-y-5 md:gap-y-[32px] md:gap-x-[52px] '
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
      class="mb-5"
      :long="!short"
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
