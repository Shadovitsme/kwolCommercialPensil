<script setup>
const props = defineProps({
  href: {
    type: String,
  },
})
</script>
<template>
  <a :href="props.href" class="p4 md:hidden mt-6 text-white w-full text-center flex justify-center"
    >Назад</a
  >
</template>
