<script setup>
import YellowButton from './components/yellowButton.vue'
import $ from 'jquery'

import router from './router'
</script>

<script>
function sendMainUserData(e) {
  e.preventDefault() // предотвращаем стандартное поведение формы
  let familyMembers = e.target[0].value
  let pets = e.target[1].value
  let soundless = e.target[2].checked
  let furniture = e.target[4].checked
  let hobby
  if (!e.target[7].checked) {
    hobby = e.target[6].value
  } else {
    hobby = '0'
  }
  let replane = e.target[8].checked
  let visitors
  if (e.target[10].checked) {
    visitors = e.target[10].value
  } else if (e.target[11].checked) {
    visitors = e.target[11].value
  } else {
    visitors = e.target[12].value
  }
  console.log(e.target[0].value)
  $.ajax({
    url: 'https://karandash.pro/brief/save_data.php ',
    type: 'POST',
    data: {
      funk: 'addCommonData',
      familyMembers: familyMembers,
      pets: pets,
      soundless: soundless,
      furniture: furniture,
      hobby: hobby,
      replane: replane,
      visitors: visitors,
    },

    success: function (data) {
      console.log(data)
      router.replace({ path: '/chooseRoom' })
    },
  })
}
</script>

<template>
  <div class="flex px-[22px] md:px-[100px]">
    <div class="md:mx-auto max-w-[1920px]">
      <h1 class="H1 Text mb-11 md:mb-9 uppercase">Укажите необходимые данные</h1>
      <form
        @submit.prevent="sendMainUserData"
        class="md:flex justify-between max-w-[1920px]"
        id="page2"
      >
        <div class="md:mr-16 md:w-[36vw]">
          <p class="p4 Text mb-2">Какое количество членов семьи собирается проживать?</p>
          <input class="input mb-4 md:mb-10" type="number" placeholder="Укажите число" />
          <p class="p4 Text mb-2">Какое количество домашних животных и комнатных растений?</p>
          <input class="input mb-5 md:mb-10" type="number" placeholder="Укажите число" />

          <p class="H6 Accent">Есть необходимость звукоизоляции?</p>
          <div class="md:flex mt-5 md:mt-1 mb-5 md:mb-8">
            <div class="mr-5 ms:mb-1">
              <input class="radio" type="radio" name="soundless" value="1" checked="true" />
              <label class="p3 Text">Звукоизоляция нужна</label>
            </div>
            <div>
              <input class="radio" type="radio" name="soundless" value="0" />
              <label class="p3 Text">Звукоизоляция не нужна</label>
            </div>
          </div>

          <p class="H6 Accent">Есть ли у вас мебель?</p>
          <div class="flex mt-4 md:mt-2 md:mb-16 mb-5">
            <div class="mr-5">
              <input class="radio" type="radio" name="furniture" value="1" checked="true" />
              <label class="p3 Text">Да</label>
            </div>
            <div>
              <input class="radio" type="radio" name="furniture" value="0" />
              <label class="p3 Text">Нет</label>
            </div>
          </div>
        </div>
        <div class="md:w-[36vw]">
          <p class="p4 Text mb-2">Наличие хобби, предполагающих размещение доп. инструментов</p>
          <textarea type="text" class="textarea mb-10" placeholder="Перечислите хобби"></textarea>
          <p class="H6 Accent">Требуется ли перепланировка?</p>
          <div class="flex mt-4 md:mt-1.5 mb-4 md:mb-8">
            <div class="mr-5">
              <input class="radio" type="radio" name="replane" value="1" checked="true" />
              <label class="p3 Text">Да</label>
            </div>
            <div>
              <input class="radio" type="radio" name="replane" value="0" />
              <label class="p3 Text">Нет</label>
            </div>
          </div>
          <p class="H6 Accent">Как часто к вам приходят гости?</p>
          <div class="md:flex mt-4 md:mt-1 mb-9">
            <div class="mr-5">
              <input
                class="radio"
                type="radio"
                name="howMuchVisitors"
                value="Несколько раз в неделю"
                checked="true"
              />
              <label class="p3 Text">Несколько раз в неделю</label>
            </div>
            <div class="md:mr-5 my-2 md:my-0">
              <input
                class="radio"
                type="radio"
                name="howMuchVisitors"
                value="Несколько раз в месяц"
              />
              <label class="p3 Text">Несколько раз в месяц</label>
            </div>
            <div>
              <input
                class="radio"
                type="radio"
                name="howMuchVisitors"
                value="Несколько раз в год"
              />
              <label class="p3 Text">Несколько раз в год</label>
            </div>
          </div>
          <p class="H6 Accent">Количество рабочих мест</p>
          <input class="input mb-4 md:mb-10" type="number" placeholder="Укажите число" />
          <div class="w-full md:mt-[75px] flex md:justify-end">
            <YellowButton :arrow="true" class="md:w-[212px]" text="Далее"></YellowButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
