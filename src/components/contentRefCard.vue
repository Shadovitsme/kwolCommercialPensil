<script setup>
import { computed } from 'vue'

const props = defineProps({
  href: {
    type: String,
  },
  comment: {
    type: String,
  },
  file: { type: File },
  haveLink: { type: Boolean },
})

const emits = defineEmits(['card-click', 'cross-click'])

import { watch } from 'vue'

watch(
  () => props.href,
  (newLink) => {
      link = newLink
  },
)
watch(
  () => props.file,
  (newFile) => {
    if (!props.haveLink) {
      link = URL.createObjectURL(newFile)
    }
  },
)

let link
if (!props.haveLink) {
  link = URL.createObjectURL(props.file)
} else {
  link = props.href
}
const truncatedHref = computed(() => {
  return props.href.length > 20 ? props.href.substring(0, 17) + '...' : props.href
})
const truncatedComment = computed(() => {
  return props.comment.length > 110 ? props.comment.substring(0, 107) + '...' : props.comment
})
function handleCardClick() {
  emits('card-click', {
    href: props.href,
    comment: props.comment,
    file: props.file,
    haveLink: props.haveLink,
  })
}
function handleCrossClick() {
  emits('cross-click', {
    href: props.href,
    comment: props.comment,
    file: props.file,
    haveLink: props.haveLink,
  })
}
</script>
<template>
  <div
    class="h-[25rem] my-7 md:my-0 bg-DarkAccent w-full md:w-[16.75rem] rounded-[0.625rem] hover:bg-background active:bg-DarkAccent p-5 relative"
    @click="handleCardClick"
  >
    <div
      class="cross absolute right-3 top-3 scale-[0.7] h-[1.25rem] w-[1.25rem]"
      @click.stop="handleCrossClick"
    ></div>
    <p class="p4 text-BrightAccent">{{ truncatedHref }}</p>
    <img :src="link" class="h-[8.75rem] my-3 rounded-[5px]" />
    <p class="p3 text-Text text-balance break-all">{{ truncatedComment }}</p>
  </div>
</template>

<style></style>
