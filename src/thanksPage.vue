<script setup>
import YellowButton from './components/yellowButton.vue'
import router from './router'
</script>

<template>
  <div class="flex px-[22px] md:pl-[100px]">
    <div class="md:mx-auto w-full max-w-[1720px]">
      <div class="md:flex md:justify-between">
        <div class="my-auto md:w-[607px]">
          <h1 class="speciall mb-4 md:mb-10 text-[64px] md:text-[175px]">спасибо!</h1>
          <p class="p3 md:p3 Text md:mb-10 mb-6">
            Мы обязательно учтём ваши пожелания и постараемся воплотить все ваши идеи в реальность
          </p>
          <a class="" href="/">
            <YellowButton
              :arrow="false"
              class="mt-[34px] md:w-[207px]"
              text="На главную"
            ></YellowButton>
          </a>
        </div>
        <div class="flex md:visible mt-6">
          <img src="./images/thank1.png" class="h-[289px] md:h-full" alt="" />
          <img
            src="./images/thank2.png"
            class="h-[247px] md:h-[630px] my-auto ml-5 rounded-[10px]"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
