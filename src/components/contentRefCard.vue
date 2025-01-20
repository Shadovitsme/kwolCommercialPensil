<script setup>
const props = defineProps({
  href: {
    type: String,
  },
  comment: {
    type: String,
  },
})
</script>
<template>
  <div
    class="h-[10.625rem] md:h-[25rem] bg-DarkAccent border-[0.0625rem] border-Accent w-full md:w-[16.75rem] rounded-[0.625rem] hover:bg-background active:bg-DarkAccent p-5 relative"
  >
    <div class="cross absolute right-3 top-3 scale-[0.7] h-[1.25rem] w-[1.25rem]"></div>
    <p class="p4 text-BrightAccent">{{ props.href }}</p>
    <img :src="props.href" class="h-[8.75rem]" />
    <p class="p3 text-Text">{{ props.comment }}</p>
  </div>
</template>

<style></style>
