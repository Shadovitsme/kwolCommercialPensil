<script setup>
import LabelAdditional from './components/labelAdditional.vue'
import YellowButton from './components/yellowButton.vue'
import router from './router'

let arr = ['Ресепшн', 'Кабинет', 'Кухня', 'Санузел', 'Переговорные', 'Кладовая', 'Склад']
</script>

<script>
function redirect() {
  router.replace({ path: '/brief_com/wishPage' })
}
</script>

<template>
  <div class="flex px-[22px] md:px-[100px]">
    <div class="md:mx-auto w-full max-w-[1920px]">
      <form id="page3" class="w-full h-full">
        <h1 class="H1 Text pb-10 uppercase">Выберите комнаты</h1>
        <div
          class="w-full md:mr-16 grid grid-cols-1 md:grid-cols-4 gap-y-5 md:gap-y-5 md:gap-x-[52px]"
        >
          <LabelAdditional :short="true" v-for="item in arr" :text="item"></LabelAdditional>
          <YellowButton
            type="button"
            class="w-full"
            text="Добавить помещение"
            :arrow="false"
          ></YellowButton>
        </div>

        <div class="w-full flex md:justify-end mt-9 md:mt-12">
          <YellowButton
            :arrow="true"
            :onclick="redirect"
            class="mt-[34px] md:w-[212px]"
            text="Далее"
          ></YellowButton>
        </div>
      </form>
    </div>
  </div>
</template>
