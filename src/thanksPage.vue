<script setup>
import YellowButton from './components/yellowButton.vue'
import router from './router'

function redirect() {
  router.replace({ path: '/' })
}
</script>

<template>
  <div class="flex px-[22px] md:pl-[100px]">
    <div class="md:mx-auto w-full max-w-[1920px]">
      <div class="flex justify-between">
        <div class="my-auto w-[607px]">
          <h1 class="speciall pb-10 text-[175px]">спасибо!</h1>
          <p class="p3 Text pb-10">
            Мы обязательно учтём ваши пожелания и постараемся воплотить все ваши идеи в реальность
          </p>
          <YellowButton
            :arrow="false"
            :onclick="redirect"
            class="mt-[34px] md:w-[207px]"
            text="На главную"
          ></YellowButton>
        </div>
        <div class="md:flex md:visible hidden">
          <img src="./images/thank1.png" alt="" />
          <img src="./images/thank2.png" class="h-[630px] my-auto ml-5 rounded-[10px]" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
