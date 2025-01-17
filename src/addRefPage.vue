<script setup>
import { ref, watch } from 'vue'
import LinkPicBlock from './components/linkPicBlock.vue'
import YellowButton from './components/yellowButton.vue'
import router from './router'
import AddCardButton from './components/addCardButton.vue'
import ModalWindowAddRef from './components/modalWindowAddRef.vue'

const modalVisible = ref(false)
function toggleModal() {
  modalVisible.value = !modalVisible.value
}

function changeInputCount(e) {
  router.replace({ path: '/brief_com/thanksPage' })
}
</script>
<template>
  <!-- modal -->
  <div v-if="modalVisible" class="fixed z-20 top-0 bottom-0 right-0 left-0 pt-[3.75rem] flex">
    <div
      @click="toggleModal"
      class="fixed z-30 bottom-0 top-0 right-0 left-0 backdrop-blur-md backdrop-brightness-[0.3]"
    ></div>

    <div
      class="h-[60rem] relative z-50 w-[47.9375rem] mx-auto p-[3.75rem] rounded-[0.625rem] border-[0.0625rem] bg-background border-Accent"
    >
      <div @click="toggleModal" class="cross absolute right-8 top-8"></div>
      <p class="text-Text H2 text-center">ДОПОЛНИТЕЛЬНЫЕ ПОЖЕЛАНИЯ</p>
      <p class="text-Text p3 text-center my-8">
        Вы можете поделиться примерами интерьеров, которые отражают ваши пожелания и предпочтения
      </p>
      <p class="text-Text mb-2 p4">Добавьте ссылку на изображение, которое вам понравилось</p>
      <input class="input mb-8" placeholder="Вставьте ссылку" type="text" />
      <p class="text-Text mb-2 p4">Или загрузите файл с вашего устройста</p>

      <!-- fileInput -->
      <label
        class="bg-DarkAccent hover:bg-background active:bg-DarkAccent w-full flex justify-center cursor-pointer h-[360px] rounded-[10px]"
      >
        <input type="file" class="hidden" />
        <div class="download"></div>
      </label>
      <!-- fileInput -->

      <p class="p5 text-QuietText">Максимальный размер 10 Мб</p>
      <p class="p5 text-QuietText mb-8">Доступные форматы JPG, PNG, WEBP</p>

      <YellowButton text="Добавить" :arrow="false" class="w-full"></YellowButton>
    </div>
  </div>
  <!-- modal -->
  <div class="flex relative px-[22px] md:px-[100px]">
    <div class="md:mx-auto w-full max-w-[1920px]">
      <form id="page3" class="w-full h-full">
        <h1 class="H1 Text pb-10 uppercase">ДОПОЛНИТЕЛЬНЫЕ ПОЖЕЛАНИЯ</h1>
        <p class="p3 Text">
          Если у вас есть референсы/примеры того, что вы бы хотели видеть, прикрепите их ниже
          ссылками или изображениями.
        </p>
        <p class="p3 text-Text pb-10">
          Вы можете добавить <a class="speciall font-[28px] inline-block">до 10 референсов.</a>
        </p>

        <AddCardButton @click="toggleModal"></AddCardButton>
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

<style>
.download {
  background: no-repeat
    url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDEiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MSA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzkwMF8yNTU4NSkiPgo8cGF0aCBkPSJNMTIuMTY3IDE5Ljk5OThMMjAuNTAwMyAyOC4zMzMyTTIwLjUwMDMgMjguMzMzMkwyOC44MzM3IDE5Ljk5OThNMjAuNTAwMyAyOC4zMzMyTDIwLjUwMDMgNi42NjY1IiBzdHJva2U9IiNGNUYyRUMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTAuNSAzMy4zMzM1SDMwLjUiIHN0cm9rZT0iI0Y1RjJFQyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfOTAwXzI1NTg1Ij4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC41KSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPg==');
  width: 40px;
  height: 40px;
  margin: auto;
}
.cross {
  background: no-repeat
    url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE4Ljg5MDYgNy4xMTg2NUwxMy45NDA1IDEyLjA2NzdMOC45OTE0NiA3LjExODY1TDcuMzQxOCA4Ljc2ODMyTDEyLjI5MDggMTMuNzE3M0w3LjM0MTggMTguNjY2M0w4Ljk5MTQ2IDIwLjMxNkwxMy45NDA1IDE1LjM2N0wxOC44OTA2IDIwLjMxNkwyMC41NDAzIDE4LjY2NjNMMTUuNTkxMyAxMy43MTczTDIwLjU0MDMgOC43NjgzMkwxOC44OTA2IDcuMTE4NjVaIiBmaWxsPSIjRjVGMkVDIi8+Cjwvc3ZnPg==');
  height: 28px;
  width: 28px;
}
</style>
