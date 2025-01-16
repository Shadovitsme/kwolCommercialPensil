<script setup>
import { ref, watch } from 'vue';
import LinkPicBlock from './components/linkPicBlock.vue';
import YellowButton from './components/yellowButton.vue';

function getPikLinks(e){
    console.log(e.target[0].value)
}

</script>
<template>
  <div class="flex px-[22px] md:px-[100px]">
    <div class="md:mx-auto w-full max-w-[1920px]">
      <form @submit.prevent="getPikLinks" id="page3" class="w-full h-full">
        <h1 class="H1 Text pb-10 uppercase">Выберите комнаты</h1>
        <p class="p3 Text pb-10">Если у вас есть референсы/примеры того, что вы бы хотели видеть, прикрепите их ниже ссылками или изображениями</p>
        
          <LinkPicBlock />

        <div class="w-full flex md:justify-end mt-9 md:mt-12">
          <YellowButton
            :arrow="true"
            class="mt-[34px] md:w-[212px]"
            text="Далее"
          ></YellowButton>
        </div>
      </form>
    </div>
  </div>
</template>
