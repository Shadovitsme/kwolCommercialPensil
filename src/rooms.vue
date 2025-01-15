<script setup>
import LabelGroup from './components/labelGroup.vue'
import YellowButton from './components/yellowButton.vue';
let textArray = [
  'Ресепшн',
  'Кабинет',
  'Кухня',
  'Санузел',
  'Переговорные',
  'Санузел',
  'Санузел',
  'Санузел',
  'Санузел',
]
</script>
<!-- в общем в рутах передавать сюда параметры и по ним выбирать значения -->
<template>
  <div class="flex px-[22px] md:px-[100px]">
    <div class="md:mx-auto w-full max-w-[1920px]">
        <form id="bedroom" class="w-full">
        <div id="bedroom">
            <h1 class="H1 Text pb-10 uppercase">Выберите комнаты</h1>
          <div id="bedroom0" class="w-full md:flex">        
        <LabelGroup :textArray="textArray"></LabelGroup>
        <div class="md:w-[1004px] w-full mt-5 md:mt-0">
          <p class="p4 Text mb-2">Пожелания по напольному покрытию</p>
          <textarea
            class="textarea w-full mb-3 h-[140px]"
            placeholder="Укажите тип покрытия для пола (плитка, ламинат и т. д.) "
          ></textarea>
          <p class="p4 Text mb-2">Пожелания по отделке стен</p>
          <textarea
            class="textarea mb-3 h-[140px]"
            placeholder="Укажите предпочтения по материалам и цвету. Если нужен декоративный элемент, уточните."
          ></textarea>
          <p class="p4 Text mb-2">Пожелания по отделке потолков</p>
          <textarea
            class="textarea mb-3 h-[140px]"
            placeholder="Опишите предпочтения по отделке потолков (натяжной, подвесной, многоуровневый, или просто окрашенный.) Укажите предпочтения по материалам и цвету. Если нужен декоративный элемент (карнизы, лепнина, балки), уточните."
          ></textarea>
          <p class="p4 Text mb-2">Другое</p>
          <textarea
            class="textarea h-[140px]"
            placeholder="Если есть другие пожелания, опишите их здесь"
          ></textarea>
        </div>
          <hr class="bg-white my-5" />
        </div></div>
        <div class="w-full flex md:justify-end mt-9 md:mt-12">
          <YellowButton
            :onclick="redirect"
            class="mt-[34px] md:w-[212px]"
            text="Далее"
          ></YellowButton>
        </div>
      </form>
    </div>
  </div>
</template>
