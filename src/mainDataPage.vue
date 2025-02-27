<script setup>
import YellowButton from './components/yellowButton.vue'
import $ from 'jquery'
import router from './router'
import { onBeforeMount, onMounted } from 'vue'
</script>

<script>
function setDataInFields(field) {
  let value = localStorage.getItem(field)
  if (value != 0 && value != '0' && value != undefined) {
    return value
  }
  return ''
}

let sphere = setDataInFields('actvitySphere')
let area = setDataInFields('area')
let zones = setDataInFields('zones')
let workPlaces = setDataInFields('workPlaces')
let soundless =
  localStorage.getItem('soundless') == 'true' || localStorage.getItem('soundless') == undefined
let furniture =
  localStorage.getItem('furniture') == 'true' || localStorage.getItem('furniture') == undefined
let replane =
  localStorage.getItem('replane') == 'true' || localStorage.getItem('replane') == undefined

function sendMainUserData(e) {
  e.preventDefault() // предотвращаем стандартное поведение формы
  let ID = localStorage.getItem('userId')

  let actvitySphere = e.target[0].value
  let area = e.target[1].value
  let soundless = e.target[2].checked
  let furniture = e.target[4].checked
  let zones = e.target[6].value
  let replane = e.target[7].checked
  let workPlaces = e.target[9].value

  localStorage.setItem('actvitySphere', actvitySphere)
  localStorage.setItem('area', area)
  localStorage.setItem('soundless', soundless)
  localStorage.setItem('furniture', furniture)
  localStorage.setItem('zones', zones)
  localStorage.setItem('replane', replane)
  localStorage.setItem('workPlaces', workPlaces)

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
            v-model="sphere"
            maxlength="50"
            id="activitySphere"
            class="input mb-4 md:mb-10"
            type="text"
            placeholder="Укажите сферу деятельности"
          />
          <p class="p4 Text mb-2">Площадь помещения в м²</p>
          <input
            v-model="area"
            id="area"
            maxlength="50"
            class="input mb-5 md:mb-10"
            type="number"
            oninput="this.value = this.value.slice(0, 50)"
            placeholder="Укажите число"
          />
          <p class="H6 Accent">Есть необходимость звукоизоляции?</p>
          <div class="md:flex mt-5 md:mt-1 mb-5 md:mb-8">
            <div class="mr-5 ms:mb-1">
              <input
                v-model="soundless"
                :checked="soundless"
                maxlength="50"
                class="radio"
                id="soundlessYes"
                type="radio"
                name="soundless"
                value="1"
              />
              <label for="soundlessYes" class="p3 Text">Звукоизоляция нужна</label>
            </div>
            <div>
              <input
                v-model="soundless"
                maxlength="50"
                class="radio"
                id="soundlessNo"
                type="radio"
                name="soundless"
                value="0"
              />
              <label class="p3 Text" for="soundlessNo">Звукоизоляция не нужна</label>
            </div>
          </div>

          <p class="H6 Accent">Есть ли у вас мебель?</p>
          <div class="flex mt-4 md:mt-2 md:mb-16 mb-5">
            <div class="mr-5">
              <input
                maxlength="50"
                v-model="furniture"
                id="furnitureYes"
                class="radio"
                type="radio"
                name="furniture"
                value="1"
                :checked="furniture"
              />
              <label for="furnitureYes" class="p3 Text">Да</label>
            </div>
            <div>
              <input
                v-model="furniture"
                maxlength="50"
                id="furnitureNo"
                class="radio"
                type="radio"
                name="furniture"
                value="0"
              />
              <label for="furnitureNo" class="p3 Text">Нет</label>
            </div>
          </div>
        </div>
        <div class="md:w-[828px]">
          <p class="p4 Text mb-2">
            Особенности зонирования (например, отдельные кабинеты, открытая планировка, зоны отдыха)
          </p>
          <textarea
            v-model="zones"
            id="zones"
            maxlength="800"
            type="text"
            class="textarea mb-10"
            placeholder="Перечислите особенности зонирования"
          ></textarea>
          <p class="H6 Accent">Требуется ли перепланировка?</p>
          <div class="flex mt-4 md:mt-1.5 mb-4 md:mb-8">
            <div class="mr-5">
              <input
                v-model="replane"
                maxlength="50"
                id="replanYes"
                class="radio"
                type="radio"
                name="replane"
                value="1"
                :checked="replane"
              />
              <label for="replanYes" class="p3 Text">Да</label>
            </div>
            <div>
              <input
                v-model="replane"
                maxlength="50"
                id="replanNo"
                class="radio"
                type="radio"
                name="replane"
                value="0"
              />
              <label for="replanNo" class="p3 Text">Нет</label>
            </div>
          </div>
          <p class="H6 Accent mb-[14px]">Количество рабочих мест</p>
          <input
            v-model="workPlaces"
            id="workPlaces"
            maxlength="50"
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
