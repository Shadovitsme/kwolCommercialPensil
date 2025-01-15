<script setup>
defineProps({
  text: {
    type: String,
  },
})
</script>

<template>
  <div class="md:flex md:h-[56px] md:static relative h-[143px]">
    <div
      class="labelWrapper md:mr-5 w-full md:w-[220px] absolute md:static top-0 z-20 flex my-auto"
    >
      <p class="p3 Text my-auto">{{ text }}</p>
    </div>
    <div
      class="flex justify-center md:no-flex md:border-0 border-b-[1px] md:static absolute top-10 border-x-[1px] md:p-0 px-4 py-6 border-QuietText rounded-b-[5px]"
    >
      <button
        name="minusButton"
        type="button"
        class="disabled:opacity-50 h-[48px] w-[48px] shrink-0 my-auto minusButton"
      ></button>
      <input class="input text-center h-14 my-auto md:w-[52px] mx-3" value="0" />
      <button
        type="button"
        name="plusButton"
        class="disabled:opacity-50 h-[48px] w-[48px] shrink-0 my-auto plusButton"
      ></button>
    </div>
  </div>
</template>

<style>
.labelWrapper {
  background-color: var(--DarkAccent);
  border-width: 1px;
  border-color: var(--Accent);
  border-radius: 5px;
  padding-block: 12px;
  padding-left: 16px;
  height: 48px;
}

@media screen and (max-width: 1024px) {
  .labelWrapper {
    height: 44px;
    padding-left: 12px;
  }
}
</style>
