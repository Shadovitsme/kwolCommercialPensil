<script setup>
import { ref, watch } from 'vue'
import LinkPicBlock from './components/linkPicBlock.vue'
import YellowButton from './components/yellowButton.vue'
import router from './router'
import AddCardButton from './components/addCardButton.vue'

function changeInputCount(e) {
  router.replace({ path: '/brief_com/thanksPage' })
}
</script>
<template>
  <div class="flex px-[22px] md:px-[100px]">
    <div class="md:mx-auto w-full max-w-[1920px]">
      <form id="page3" class="w-full h-full">
        <h1 class="H1 Text pb-10 uppercase">ДОПОЛНИТЕЛЬНЫЕ ПОЖЕЛАНИЯ</h1>
        <p class="p3 Text ">
          Если у вас есть референсы/примеры того, что вы бы хотели видеть, прикрепите их ниже
          ссылками или изображениями.
        </p>
        <p class="p3 text-Text pb-10">Вы можете добавить <p class="speciall font-[28px] inline-block">до 10 референсов.</p></p>

<AddCardButton></AddCardButton>
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
