<script setup>
import YellowButton from './components/yellowButton.vue'
import $ from 'jquery'
import { getCookie } from './utility/getCookie'

import router from './router'
</script>

<script>
let contentArr = [
  'actvitySphere',
  'area',
  'soundless',
  'furniture',
  'zones',
  'replane',
  'workPlaces',
]

$(document).ready(function () {
  document.getElementById('page2').elements[0].value = localStorage.getItem(contentArr[0])
  document.getElementById('page2').elements[1].value = localStorage.getItem(contentArr[1])
  document.getElementById('page2').elements[2].value = localStorage.getItem(contentArr[2])
  document.getElementById('page2').elements[4].value = localStorage.getItem(contentArr[3])
  document.getElementById('page2').elements[6].value = localStorage.getItem(contentArr[4])
  document.getElementById('page2').elements[7].value = localStorage.getItem(contentArr[5])
  document.getElementById('page2').elements[9].value = localStorage.getItem(contentArr[6])
})

function sendMainUserData(e) {
  e.preventDefault() // предотвращаем стандартное поведение формы
  let ID = localStorage.getItem('userId')

  let actvitySphere = e.target[0].value
  // localStorage.setItem('actvitySphere', actvitySphere)

  let area = e.target[1].value
  // localStorage.setItem('area', area)

  let soundless = e.target[2].checked
  // localStorage.setItem('soundless', soundless)

  let furniture = e.target[4].checked
  // localStorage.setItem('furniture', furniture)

  let zones = e.target[6].value
  // localStorage.setItem('zones', zones)

  let replane = e.target[7].checked
  // localStorage.setItem('replane', replane)

  let workPlaces = e.target[9].value
  // localStorage.setItem('workPlaces', workPlaces)

  $.ajax({
    url: 'https://karandash.pro/brief/save_data.php ',
    type: 'POST',
    data: {
      funk: 'addCommonData',
      userId: ID,
      actvitySphere: actvitySphere,
      area: area,
      soundless: soundless,
      furniture: furniture,
      zones: zones,
      replane: replane,
      workPlaces: workPlaces,
      familyMembers: null,
      pets: null,
      hobby: null,
      visitors: null,
    },

    success: function (data) {
      console.log(data)

      router.replace({ path: '/brief_com/chooseRoom' })
    },
  })
}
</script>

<template>
  <div class="flex px-[22px] md:px-[100px]">
    <div class="md:mx-auto w-full max-w-[1920px]">
      <h1 class="H1 Text mb-11 md:mb-9 uppercase">Укажите необходимые данные</h1>
      <form id="page2" @submit.prevent="sendMainUserData" class="md:flex max-w-[1920px]">
        <div class="md:mr-16 md:w-[828px]">
          <p class="p4 Text mb-2">Сфера деятельности (магазин, офис, кафе, салон красоты и т.д)</p>
          <input
            name="test"
            class="input mb-4 md:mb-10"
            type="text"
            placeholder="Укажите сферу деятельности"
          />
          <p class="p4 Text mb-2">Площадь помещения в м²</p>
          <input
            class="input mb-5 md:mb-10"
            type="number"
            oninput="this.value = this.value.slice(0, 50)"
            placeholder="Укажите число"
          />
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
        <div class="md:w-[828px]">
          <p class="p4 Text mb-2">
            Особенности зонирования (например, отдельные кабинеты, открытая планировка, зоны отдыха)
          </p>
          <textarea
            type="text"
            class="textarea mb-10"
            placeholder="Перечислите особенности зонирования"
          ></textarea>
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
          <p class="H6 Accent mb-[14px]">Количество рабочих мест</p>
          <input
            class="input mb-4 md:mb-10"
            type="number"
            oninput="this.value = this.value.slice(0, 50)"
            placeholder="Укажите число"
          />
          <div class="w-full md:mt-10 mt-5 flex md:justify-end">
            <YellowButton :arrow="true" class="md:w-[212px]" text="Далее"></YellowButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
