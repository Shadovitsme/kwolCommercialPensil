<script setup>
defineProps({
  text: {
    type: String,
  },
})
</script>
<template>
  <button class="md:w-[318px] w-full h-[40px] md:h-[60px] flex yellowButton" type="submit">
    <div class="flex mx-auto my-auto">
      <p class="p3">{{ text }}</p>
      <div class="rightArrow md:visible md:block hidden h-6 w-6 ml-6 mt-1"></div>
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
