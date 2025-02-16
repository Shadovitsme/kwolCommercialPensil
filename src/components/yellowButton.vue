<script setup>
const props = defineProps({
  text: {
    type: String,
  },
  arrow: { type: Boolean, require: false },
})
</script>
<template>
  <button class="h-[44px] md:h-[60px] flex justify-center content-center items-center yellowButton">
    <p class="p3">{{ text }}</p>
    <img src="../images/Vector.svg" v-if="props.arrow" class="ml-4 my-auto hidden md:block" />
  </button>
</template>
