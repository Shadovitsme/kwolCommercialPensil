<script setup>
import { computed } from 'vue';
const props = defineProps({
  href: {
    type: String,
  },
  comment: {
    type: String,
  },
})
const truncatedHref = computed(() => {
  return props.href.length > 25 ? props.href.substring(0, 25) + '...' : props.href;
});
const truncatedComment = computed(() => {
  return props.comment.length > 90 ? props.comment.substring(0, 90) + '...' : props.comment;
});
</script>
<template>
  <div
    class="h-[10.625rem] md:h-[25rem] bg-DarkAccent w-full md:w-[16.75rem] rounded-[0.625rem] hover:bg-background active:bg-DarkAccent p-5 relative"
  >
    <div class="cross absolute right-3 top-3 scale-[0.7] h-[1.25rem] w-[1.25rem]"></div>
    <p class="p4 text-BrightAccent">{{ truncatedHref }}</p>
    <img :src="props.href" class="h-[8.75rem] my-3" />
    <p class="p3 text-Text text-balance ">{{ truncatedComment }}</p>
  </div>
</template>

<style></style>
