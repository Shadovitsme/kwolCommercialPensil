<script setup>
import BackButton from './components/backButton.vue'
import BackLink from './components/backLink.vue';
import YellowButton from './components/yellowButton.vue'
import router from './router'

function replace(e) {
  // TODO сделать запись пожеланий коммерческого брифа
  router.replace({ path: '/brief_com/rooms' })
}
</script>
<template>
  <div class="flex px-[22px] md:px-[100px]">
    <div class="md:mx-auto w-full max-w-[1920px]">
      <h1 class="H1 Text mb-10 uppercase">Пожелания ко всем комнатам</h1>
      <form @submit.prevent="replace" id="wishPage">
        <div class="md:flex md:h-full">
          <div class="md:w-[828px] md:mr-16">
            <p class="p4 Text mb-2">Пожелания по освещению</p>
            <textarea
              class="textarea w-full mb-5"
              placeholder="Опишите предпочтения по освещению (центральное, подсветка)"
            ></textarea>
            <p class="p4 Text mb-2">Зона теплого пола</p>
            <textarea
              class="textarea w-full mb-5"
              placeholder="Опишите зоны, в которых нужна установка тёплого пола"
            ></textarea>
            <p class="p4 Text mb-2">Пожелания по отделке потолков</p>
            <textarea
              class="textarea w-full mb-5"
              placeholder="Опишите предпочтения по отделке потолков (натяжной, подвесной, многоуровневый, или просто окрашенный.) Укажите предпочтения по материалам и цвету. Если нужен декоративный элемент (карнизы, лепнина, балки), уточните."
            ></textarea>

            <p class="p4 Text mb-2">Пожелания по напольному покрытию</p>
            <textarea
              class="textarea w-full mb-5"
              placeholder="Укажите тип покрытия для пола (плитка, ламинат и т. д.) "
            ></textarea>

            <p class="p4 Text mb-2">Ограничения по срокам</p>
            <input class="input mb-5" type="text" placeholder="Укажите в днях" />
          </div>
          <div class="md:w-[828px]">
            <p class="p4 mb-2 Text">Кондиционирование</p>
            <input
              class="input mb-5"
              type="text"
              placeholder="Опишите зоны, в которых нужно кондиционирование"
            />
            <p class="p4 Text mb-2">
              Какой стиль вы хотите видеть? Какие цвета должны преобладать в интерьере?
            </p>
            <textarea
              class="textarea mb-5"
              type="text"
              placeholder="Опишите как можно подробнее"
            ></textarea>

            <p class="p4 Text mb-2">Хочу видеть в будущем интерьере:</p>
            <textarea class="textarea mb-5" placeholder="Опишите как можно подробнее"></textarea>

            <p class="p4 Text mb-2">Категорически не хочу видеть в будущем интерьере:</p>
            <textarea class="textarea mb-5" placeholder="Опишите как можно подробнее"></textarea>

            <p class="p4 Text mb-2">Дополнительный комментарий</p>
            <textarea
              class="textarea"
              type="text"
              placeholder="Если есть какая‑либо информация, которую вы считаете важной, укажите её здесь"
            ></textarea>
          </div>
        </div>
        <div class="w-full md:flex md:justify-between mt-9 md:mt-12">
          <a href="/brief_com/chooseRoom"> <BackButton></BackButton> </a>
          <YellowButton :arrow="true" class="md:w-[212px]" text="Далее"></YellowButton>
          <BackLink href="/brief_com/chooseRoom"></BackLink>
        </div>
      </form>
    </div>
  </div>
</template>
