<script setup>
import { errorMessages } from 'vue/compiler-sfc'
import LabelAdditional from './components/labelAdditional.vue'
import YellowButton from './components/yellowButton.vue'
import router from './router'
import errorMessage from './components/errorMessage.vue'
import { ref } from 'vue'
import { getCookie } from './utility/getCookie'
import $ from 'jquery'
import InputLabel from './components/inputLabel.vue'

let arr = [
  'Ресепшн',
  'Кабинет',
  'Кухня',
  'Санузел',
  'Переговорные',
  'Кладовая',
  'Склад',
  'Зона ожидания',
]
</script>

<script>
let userRoomCount = ref(0)
let count = ref(new Array(20).fill(0))

function checkContentAdditionalRooms() {
  return count.value.find((value) => value !== 0)
}

function addRoom() {
  userRoomCount.value++
  count.value.push(0)
}
let error = ref(false)

function setRoomCookie(customUserRoomNames) {
  for (let i = 0; i < userRoomCount.value; i++) {
    if (count.value[i]) {
      localStorage.setItem(customUserRoomNames[i], count.value[i])

      document.cookie = `${customUserRoomNames[i]}=${count.value[i]}; path=/; max-age=3600`
    }
  }
}

function setStaticRoomCookie(valueArr) {
  let arr = [
    'Ресепшн',
    'Кабинет',
    'Кухня',
    'Санузел',
    'Переговорные',
    'Кладовая',
    'Склад',
    'Зона ожидания',
  ]

  for (let i = 0; i <= arr.length; i++) {
    if (valueArr[i] != '0') {
      localStorage.setItem(arr[i], valueArr[i])
      document.cookie = `${arr[i]}=${valueArr[i]}; path=/; max-age=3600`
    }
  }
}

function redirect(e) {
  e.preventDefault() // предотвращаем стандартное поведение формы
  let reception = e.target[1].value
  let cabinet = e.target[4].value
  let kitchen = e.target[7].value
  let tualet = e.target[10].value
  let speakingRoom = e.target[13].value
  let storeRoom = e.target[16].value
  let sclad = e.target[19].value
  let waitingRoom = e.target[22].value
  let valueArr = [reception, cabinet, kitchen, tualet, speakingRoom, storeRoom, sclad, waitingRoom]
  let ID = localStorage.getItem('userId')
  let customUserRoomNames = new Array(20).fill(0)

  let m = 24

  if (
    (reception && reception !== '0') ||
    (cabinet && cabinet !== '0') ||
    (kitchen && kitchen !== '0') ||
    (tualet && tualet !== '0') ||
    (speakingRoom && speakingRoom !== '0') ||
    (storeRoom && storeRoom !== '0') ||
    (sclad && sclad !== '0') ||
    (waitingRoom && waitingRoom !== '0') ||
    checkContentAdditionalRooms()
  ) {
    for (let i = 0; i < userRoomCount.value; i++) {
      customUserRoomNames[i] = e.target[m].value
      m += 4
    }

    $.ajax({
      url: 'https://karandash.pro/brief/save_data.php',
      type: 'POST',
      data: {
        funk: 'addRoomCount',
        userId: ID,
        Ресепшн: reception,
        Кабинет: cabinet,
        кухня: kitchen,
        Санузел: tualet,
        переговорные: speakingRoom,
        кладовая: storeRoom,
        склад: sclad,
        Зона_ожидания: waitingRoom,
        ...customUserRoomNames.reduce((acc, name, index) => {
          if (name) {
            acc[name] = count.value[index]
          }
          return acc
        }, {}),
      },
      success: function (data) {
        console.log(data)
        setStaticRoomCookie(valueArr)
        setRoomCookie(customUserRoomNames)

        router.replace({ path: '/brief_com/wishPage' })
      },
    })
  } else {
    showErrorMessage()
  }
}

function showErrorMessage() {
  error.value = true

  // Hide the error message after 3 seconds
  setTimeout(function () {
    error.value = false
  }, 3000)
}

function plus(index) {
  if (index >= 0 && index < 5) {
    count.value[index] = count.value[index] + 1
  }
  if (count.value[index] > 5) {
    count.value[index] = 5
  }
}

function minus(index) {
  if (index >= 0 && index < 5) {
    count.value[index] = (count.value[index] || 0) - 1
    if (count.value[index] < 0) {
      count.value[index] = 0
    }
  }
}
</script>

<template>
  <div class="flex px-[22px] md:px-[100px]">
    <div class="md:mx-auto w-full max-w-[1920px] relative h-[776px] max-h-[776px]">
      <form @submit.prevent="redirect" id="page3" class="w-full h-full">
        <h1 class="H1 Text pb-10 uppercase">Выберите комнаты</h1>
        <div
          class="w-full md:mr-16 grid grid-cols-1 md:grid-cols-4 gap-y-5 md:gap-y-5 md:gap-x-[52px]"
        >
          <LabelAdditional :short="true" v-for="item in arr" :text="item"></LabelAdditional>
          <InputLabel :count="count" :userRoomCount="userRoomCount"></InputLabel>
          <div v-if="userRoomCount > 19" class="w-full h-full"></div>

          <YellowButton
            v-if="userRoomCount < 20"
            type="button"
            @click="addRoom"
            class="w-full"
            text="Добавить помещение"
            :arrow="false"
          ></YellowButton>
        </div>
        <errorMessage
          v-if="error"
          class="md:absolute static md:right-0 z-20 md:bottom-[84px]"
        ></errorMessage>

        <div class="w-full flex md:justify-end mt-9 md:mt-12">
          <YellowButton
            :arrow="true"
            class="mt-[34px] md:w-[212px] md:absolute w-full right-0 bottom-0"
            text="Далее"
          ></YellowButton>
        </div>
      </form>
    </div>
  </div>
</template>
