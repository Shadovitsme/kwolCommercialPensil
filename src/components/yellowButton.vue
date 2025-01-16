<script setup>
const props = defineProps({
  text: {
    type: String,
  },
  arrow: { type: Boolean, require: false },
})
</script>
<template>
  <button class="h-[40px] md:h-[60px] flex yellowButton">
    <div class="flex mx-auto my-auto">
      <p class="p3">{{ text }}</p>
      <div v-if="props.arrow" class="rightArrow h-6 w-6 ml-4 mt-1 md:visible hidden md:block"></div>
    </div>
  </button>
</template>

<style>

</style>
