<script setup>
import { ref, watch } from 'vue'
import LinkPicBlock from './components/linkPicBlock.vue'
import YellowButton from './components/yellowButton.vue'
import router from './router'

function changeInputCount(e) {
  router.replace({ path: '/thanksPage' })
}
</script>
<template>
  <div class="flex px-[22px] md:px-[100px]">
    <div class="md:mx-auto w-full max-w-[1920px]">
      <form id="page3" class="w-full h-full">
        <h1 class="H1 Text pb-10 uppercase">Выберите комнаты</h1>
        <p class="p3 Text pb-10">
          Если у вас есть референсы/примеры того, что вы бы хотели видеть, прикрепите их ниже
          ссылками или изображениями
        </p>

        <LinkPicBlock />

        <div class="w-full flex md:justify-end mt-9 md:mt-12">
          <YellowButton
            :onclick="changeInputCount"
            :arrow="true"
            class="mt-[34px] md:w-[212px]"
            text="Далее"
          ></YellowButton>
        </div>
      </form>
    </div>
  </div>
</template>
