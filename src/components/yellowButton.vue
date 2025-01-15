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
        v-if="!props.arrow"
        class="rightArrow md:visible md:block hidden h-6 w-6 ml-6 mt-1"
      ></div>
    </div>
  </button>
</template>

<style>
.yellowButton {
  border-radius: 5px;
  background-color: var(--Accent);
  padding-top: 18px;
  padding-bottom: 22px;
}

.yellowButton:hover {
  background-color: var(--BrightAccent);
}

.yellowButton:active {
  background-color: var(--BrightAccent);
}
@media screen and (max-width: 1024px) {
  .yellowButton {
    padding-top: 10px;
    padding-bottom: 14px;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  }
}
</style>
