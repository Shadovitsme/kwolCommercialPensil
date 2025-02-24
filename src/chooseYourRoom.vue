<script setup>
import LabelAdditional from './components/labelAdditional.vue'
import YellowButton from './components/yellowButton.vue'
import router from './router'
import errorMessage from './components/errorMessage.vue'
import { ref } from 'vue'
import $ from 'jquery'
import InputLabel from './components/inputLabel.vue'
import BackButton from './components/backButton.vue'
import BackLink from './components/backLink.vue'
import backButtonFunction from './customjs/backButtonFunction'
</script>

<script>
let userRoomCount = ref(0)
let count = ref(new Array(20).fill(0))
let error = ref(false)
let publicCustomArr = ref()

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

function checkContentAdditionalRooms() {
  return count.value.find((value) => value !== 0)
}

function setCustomUserRoomLocalStorage(customUserRoomNames) {
  for (let i = 0; i < userRoomCount.value; i++) {
    if (count.value[i]) {
      localStorage.setItem('room|' + customUserRoomNames[i], count.value[i])
    }
  }
}

function setDefaultRoomLocalStorage(valueArr) {
  for (let i = 0; i <= arr.length; i++) {
    if (valueArr[i] != '0') {
      localStorage.setItem('room|' + arr[i], valueArr[i])
    }
  }
}

function redirect(e) {
  e.preventDefault() // предотвращаем стандартное поведение формы
  // заполняем массив с данными
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

  // TODO уменьшить вложенность
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
        setDefaultRoomLocalStorage(valueArr)
        setCustomUserRoomLocalStorage(customUserRoomNames)

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

function checkLocalStorage(num) {
  if (localStorage.getItem('room|' + arr[num]) == undefined) {
    return 0
  }
  return localStorage.getItem('room|' + arr[num])
}

function fillCustomRoomsFromLocalStorage() {
  let storage = localStorage
  const regex = /^room\|[\w\d]+$/
  let customArr = []
  let m = 0
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i)
    let result = key.replace(/^room\|/, '')
    if (
      !arr.find((element) => element == result) &&
      regex.test(key) &&
      storage.getItem(key) != 'undefined' &&
      storage.getItem(key) != '0'
    ) {
      customArr.push(result)
      userRoomCount.value = userRoomCount.value + 1
      count.value[m] = storage.getItem(key)
      m++
      console.log(count.value)
    }
  }
  return customArr
}

$(document).ready(function () {
  publicCustomArr.value = fillCustomRoomsFromLocalStorage()
  let l = 1
  for (let i = 0; i < arr.length; i++) {
    document.getElementById('page3').elements[l].value = checkLocalStorage(i)
    l += 3
  }
})
</script>

<template>
  <div class="flex px-[22px] md:px-[100px]">
    <div class="md:mx-auto w-full max-w-[1920px] relative md:h-[776px] md:max-h-[776px]">
      <form @submit.prevent="redirect" id="page3" class="w-full h-full">
        <h1 class="H1 Text pb-10 uppercase">Выберите комнаты</h1>
        <div
          class="w-full md:mr-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-5 md:gap-y-5 md:gap-x-[52px]"
        >
          <LabelAdditional :short="true" v-for="item in arr" :text="item"></LabelAdditional>
          <InputLabel
            :customArr="publicCustomArr"
            :count="count"
            :userRoomCount="userRoomCount"
          ></InputLabel>
          <div v-if="userRoomCount > 19" class="w-full h-full"></div>

          <YellowButton
            v-if="userRoomCount < 20"
            type="button"
            @click="userRoomCount++"
            class="w-full"
            text="Добавить помещение"
            :arrow="false"
          ></YellowButton>
        </div>
        <errorMessage
          v-if="error"
          class="md:absolute static md:right-0 z-20 md:bottom-[84px]"
        ></errorMessage>

        <div
          class="w-full md:flex 2xl:absolute md:bottom-0 items-end md:justify-between mt-9 md:mt-12"
        >
          <BackButton @click="backButtonFunction('/brief_com/mainData')"></BackButton>
          <YellowButton :arrow="true" class="md:w-[212px] w-full" text="Далее"></YellowButton>
          <BackLink @click="backButtonFunction('/brief_com/mainData')"></BackLink>
        </div>
      </form>
    </div>
  </div>
</template>
