<script setup>
import BackButton from './components/backButton.vue'
import BackLink from './components/backLink.vue'
import YellowButton from './components/yellowButton.vue'
import router from './router'
import $ from 'jquery'
import backButtonFunction from './customjs/backButtonFunction'

function setDataInFields(field) {
  document.getElementById(field).value = localStorage.getItem(field)
}

$(document).ready(function () {
  setDataInFields('light')
  setDataInFields('warmFloor')
  setDataInFields('ceiling')
  setDataInFields('deadline')
  setDataInFields('condicioner')
  setDataInFields('floor')
  setDataInFields('style')
  setDataInFields('wannaSee')
  setDataInFields('dontWannaSee')
  setDataInFields('additional')
})

function replace(e) {
  let ID = localStorage.getItem('userId')
  let light = e.target[0].value
  localStorage.setItem('light', light)

  let warmFloor = e.target[1].value
  localStorage.setItem('warmFloor', warmFloor)

  let ceiling = e.target[2].value
  localStorage.setItem('ceiling', ceiling)

  let floor = e.target[3].value
  localStorage.setItem('floor', floor)

  let deadline = e.target[4].value
  localStorage.setItem('deadline', deadline)

  let condicioner = e.target[5].value
  localStorage.setItem('condicioner', condicioner)

  let style = e.target[6].value
  localStorage.setItem('style', style)

  let wannaSee = e.target[7].value
  localStorage.setItem('wannaSee', wannaSee)

  let dontWannaSee = e.target[8].value
  localStorage.setItem('dontWannaSee', dontWannaSee)

  let additional = e.target[9].value
  localStorage.setItem('additional', additional)

  $.ajax({
    url: 'https://karandash.pro/brief/save_data.php',
    type: 'POST',
    data: {
      funk: 'addWishes',
      userId: ID,
      light: light,
      warmFloor: warmFloor,
      ceiling: ceiling,
      floor: floor,
      deadline: deadline,
      condicioner: condicioner,
      style: style,
      wannaSee: wannaSee,
      dontWannaSee: dontWannaSee,
      additional: additional,
    },
    success: function (data) {
      console.log(data)

      router.replace({ path: '/brief_com/rooms' })
    },
  })
}

function backButton() {
  router.replace({ path: '/brief_com/chooseRoom' })
}
</script>
<template>
  <div class="flex px-[22px] md:px-[100px]">
    <div class="md:mx-auto w-full max-w-[1920px]">
      <h1 class="H1 Text mb-10 uppercase">Пожелания ко всем комнатам</h1>
      <form @submit.prevent="replace" id="wishPage">
        <div class="md:flex md:h-full">
          <div class="w-full md:w-1/2 md:mr-16">
            <p class="p4 Text mb-2">Пожелания по освещению</p>
            <textarea
              id="light"
              maxlength="800"
              class="textarea w-full mb-5"
              placeholder="Опишите предпочтения по освещению (центральное, подсветка)"
            ></textarea>
            <p class="p4 Text mb-2">Зона теплого пола</p>
            <textarea
              id="warmFloor"
              maxlength="800"
              class="textarea w-full mb-5"
              placeholder="Опишите зоны, в которых нужна установка тёплого пола"
            ></textarea>
            <p class="p4 Text mb-2">Пожелания по отделке потолков</p>
            <textarea
              id="ceiling"
              maxlength="800"
              class="textarea w-full mb-5"
              placeholder="Опишите предпочтения по отделке потолков (натяжной, подвесной, многоуровневый, или просто окрашенный.) Укажите предпочтения по материалам и цвету. Если нужен декоративный элемент (карнизы, лепнина, балки), уточните."
            ></textarea>

            <p class="p4 Text mb-2">Пожелания по напольному покрытию</p>
            <textarea
              id="floor"
              maxlength="800"
              class="textarea w-full mb-5"
              placeholder="Укажите тип покрытия для пола (плитка, ламинат и т. д.) "
            ></textarea>

            <p class="p4 Text mb-2">Ограничения по срокам</p>
            <input
              id="deadline"
              maxlength="50"
              class="input mb-5"
              type="text"
              placeholder="Укажите в днях"
            />
          </div>
          <div class="w-full md:w-1/2">
            <p class="p4 mb-2 Text">Кондиционирование</p>
            <input
              id="condicioner"
              maxlength="50"
              class="input mb-5"
              type="text"
              placeholder="Опишите зоны, в которых нужно кондиционирование"
            />
            <p class="p4 Text mb-2">
              Какой стиль вы хотите видеть? Какие цвета должны преобладать в интерьере?
            </p>
            <textarea
              id="style"
              maxlength="800"
              class="textarea mb-5"
              type="text"
              placeholder="Опишите как можно подробнее"
            ></textarea>

            <p class="p4 Text mb-2">Хочу видеть в будущем интерьере:</p>
            <textarea
              id="wannaSee"
              maxlength="800"
              class="textarea mb-5"
              placeholder="Опишите как можно подробнее"
            ></textarea>

            <p class="p4 Text mb-2">Категорически не хочу видеть в будущем интерьере:</p>
            <textarea
              id="dontWannaSee"
              maxlength="800"
              class="textarea mb-5"
              placeholder="Опишите как можно подробнее"
            ></textarea>

            <p class="p4 Text mb-2">Дополнительный комментарий</p>
            <textarea
              id="additional"
              maxlength="800"
              class="textarea"
              type="text"
              placeholder="Если есть какая‑либо информация, которую вы считаете важной, укажите её здесь"
            ></textarea>
          </div>
        </div>
        <div class="w-full md:flex md:justify-between mt-9 md:mt-12">
          <BackButton @click="backButtonFunction('/brief_com/chooseRoom')"></BackButton>
          <YellowButton :arrow="true" class="md:w-[212px]" text="Далее"></YellowButton>
          <BackLink @click="backButtonFunction('/brief_com/chooseRoom')"></BackLink>
        </div>
      </form>
    </div>
  </div>
</template>
