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
      <div
        v-if="props.arrow"
        class="rightArrow h-5 w-5 ml-[18px] mt-[7px] md:visible hidden md:block"
      ></div>
    </div>
  </button>
</template>

<style></style>
