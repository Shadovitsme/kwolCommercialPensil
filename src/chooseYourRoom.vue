<script setup lang="ts">
import LabelAdditional from './components/labelAdditional.vue'
import YellowButton from './components/yellowButton.vue';
let arr = ['Ресепшн', 'Кабинет', 'Кухня','Санузел','Переговорные','Кладовая','Склад']
</script>

<template>
  <div class="flex px-[22px] md:px-[100px]">
    <div class="md:mx-auto w-full max-w-[1920px]">
      <form id="page3" class="w-full h-full">
        <h1 class="H1 Text pb-10 uppercase">Выберите комнаты</h1>
          <div
            class="w-full md:mr-16 grid grid-cols-1 md:grid-cols-4 gap-y-5 md:gap-y-5 md:gap-x-[52px]"
          >
            <LabelAdditional v-for="item in arr" :text="item"></LabelAdditional>
            <YellowButton class="w-full" text="Добавить помещение" :arrow="false"></YellowButton>
          </div>
         
        <div class="w-full flex md:justify-end mt-9 md:mt-12">
          <button class="yellowButton w-full md:w-[212px] h-10 md:h-[60px] flex" type="submit">
            <div class="flex mx-auto my-auto">
              <p class="p3">Далее</p>
              <div class="rightArrow h-6 w-6 ml-6 md:visible hidden md:block"></div>
            </div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
