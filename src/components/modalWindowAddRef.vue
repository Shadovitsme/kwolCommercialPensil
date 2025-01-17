<script setup>
import YellowButton from './yellowButton.vue';

</script>

<template>
  <div class="fixed z-20 top-0 bottom-0 right-0 left-0 pt-[3.75rem] flex">
    <div
      class="fixed z-30 bottom-0 top-0 right-0 left-0 backdrop-blur-md backdrop-brightness-[0.3]"
    ></div>

    <div
      class="h-[60rem] z-50 w-[47.9375rem] mx-auto p-[3.75rem] rounded-[0.625rem] border-[0.0625rem] bg-background border-Accent"
    >
      <p class="text-Text">add</p>
      <p class="text-Text">skdfjasldkjflkasjdflk</p>
      <p class="text-Text mb-2">sdfsdfasdf</p>
      <input class="input" />
      <p class="text-Text mb-2">ajfkdslafjksldf</p>
      <label
        class="bg-DarkAccent w-full flex justify-center cursor-pointer h-[360px] rounded-[10px]"
      >
        <input
          type="file"
          class="hidden"
        />
        <span class="p3 text-Text">или загрузите изображение</span>
      </label>      <p class="text-gray-300">jsaklfjsakdlfjsdl</p>
      <YellowButton text="Добавить" :arrow="false" class="w-full"></YellowButton>
    </div>
  </div>
</template>
