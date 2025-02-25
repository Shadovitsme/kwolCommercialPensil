<script setup>
import LabelGroup from './components/labelGroup.vue'
import YellowButton from './components/yellowButton.vue'
import $ from 'jquery'
import { ref, watch } from 'vue'
import router from './router'
import BackButton from './components/backButton.vue'
import BackLink from './components/backLink.vue'
import backButtonFunction from './customjs/backButtonFunction'

const roomArray = [
  [
    'Ресепшн',
    [
      'Стойка администратора',
      'Стул для администратора',
      'Диван или кресла для клиентов',
      'Журнальный столик',
      'Подставка для брошюр, визиток',
      'Теплый пол',
      'Кондиционирование',
    ],
  ],
  [
    'Кабинет',
    [
      'Рабочий стол',
      'Кресло/стул',
      'Полки для хранения книг',
      'Организация места для документов',
      'Настольная лампа',
      'Центральное освещение',
    ],
  ],
  [
    'Кухня',
    [
      'Водонагреватель',
      'Посудомойка',
      'Фильтр для воды',
      'Духовой шкаф',
      'Холодильник',
      'Измельчитель отходов',
      'Подсветка',
      'Мойка',
      'Микроволновка',
      'Защита от протечек',
      'Вытяжка',
      'Теплый пол',
    ],
  ],
  [
    'Санузел',
    [
      'Унитаз',
      'Раковина',
      'Фильтр очистки воды',
      'Водонагреватель',
      'Полотенцесушитель',
      'Теплый пол',
      'Кондиционирование',
    ],
  ],
  [
    'Зона ожидания',
    [
      'Диван',
      'Журнальный столик',
      'Шкаф',
      'Кресла',
      'Напольная вешалка',
      'Теплый пол',
      'Кондиционирование',
    ],
  ],
  [
    'Переговорная',
    [
      'Стол для переговоров',
      'Стулья для участников',
      'Доска для записей ',
      'Шкаф или полка для документов',
      'Техническое оборудование',
      'Теплый пол',
      'Кондиционирование',
    ],
  ],
  [
    'Кладовая',
    [
      'Полки для хранения инвентаря',
      'Система организации хранения',
      'Вентиляция',
      'Кондиционирование',
    ],
  ],
  [
    'Склад',
    [
      'Стеллажи для хранения товаров',
      'Контейнеры или коробки для вещей',
      'Вентиляция',
      'Кондиционирование',
      'Рабочий стол для учета и сортировки ',
    ],
  ],
]

const roomArrayNames = [
  'Ресепшн',
  'Кабинет',
  'Кухня',
  'Санузел',
  'Зона ожидания',
  'Переговорная',
  'Кладовая',
  'Склад',
]

let defaultRoomEnd = ref(false)
let customCounterI = ref(0)
const customUserArray = getAllCookiesExcept(roomArrayNames)
let i = ref(findChoosenRoom(0))
let roomName = ref()
let textArray = ref()
let roomCounter = ref()
let testareaStyle = ref()

selectArray()

function selectArray() {
  if (defaultRoomEnd.value) {
    roomName.value = customUserArray[customCounterI.value][0]
    textArray.value = ['Теплый пол', 'Кондиционирование']
    roomCounter.value = Number(customUserArray[customCounterI.value][1])
    customCounterI.value++
  } else {
    roomName = ref(roomArray[i.value][0])
    textArray = ref(roomArray[i.value][1])
    roomCounter = ref(Number(localStorage.getItem('room|' + roomName.value)))
  }
}

function createArrayForAjax(e) {
  let m = 1
  let roomArr = []
  const staticFields = ['пол', 'стены', 'потолки', 'метраж', 'другое']

  for (let i = 0; i < roomCounter.value; i++) {
    let roomContentArr = []
    textArray.value.forEach((element) => {
      roomContentArr.push([element, e.target[m].value])
      m += 3
    })

    m--

    for (let i = 0; i < 5; i++) {
      let k = m + 2
      if (!e.target[m].value) {
        break
      }
      roomContentArr.push([e.target[m].value, e.target[k].value])
      m = k + 2
      k = m + 2
    }
    m++
    for (let i = 0; i < 5; i++) {
      roomContentArr.push([staticFields[i], e.target[m].value])
      m++
    }
    m++

    roomArr.push([`${roomName.value}${i}`, roomContentArr])

    if (i == roomCounter.value - 1) {
      break
    }
  }
  return roomArr
}

function setUserData(roomArr) {
  for (let i = 0; i < roomArr.length; i++) {
    for (let j = 0; j < roomArr[i][1].length; j++) {
      localStorage.setItem(
        'detailRoomData|' + roomArr[i][0] + '|' + roomArr[i][1][j][0],
        roomArr[i][1][j][1],
      )
    }
  }
}

function getUserData() {
  for (let i = 0; i < roomCounter.value; i++) {
    for (let j = 0; j < textArray.value.length; j++) {
      document.getElementById(roomName.value + i).children[0].children[
        j
      ].children[1].children[1].value = getValueForFiller(roomName.value + i, textArray.value[j])
    }
  }
}

function getValueForFiller(roomName, textArray) {
  let result = localStorage.getItem('detailRoomData|' + roomName + '|' + textArray)
  if (result == undefined) {
    return 0
  }
  return result
}

$(document).ready(function () {
  getUserData()
})

function sendRoomDetailData(e) {
  e.preventDefault()
  let arr = createArrayForAjax(e)
  setUserData(arr)
  if (!defaultRoomEnd.value) {
    i.value = findChoosenRoom(i.value + 1)
  }
  if (customCounterI.value >= customUserArray.length && defaultRoomEnd.value) {
    router.replace({ path: '/brief_com/addRefPage' })
  }
  if (defaultRoomEnd.value) {
    roomName.value = customUserArray[customCounterI.value][0]
    textArray.value = ['Теплый пол', 'Кондиционирование']
    roomCounter.value = Number(customUserArray[customCounterI.value][1])
    customCounterI.value++
  } else {
    roomName.value = roomArray[i.value][0]
    roomCounter.value = Number(localStorage.getItem('room|' + roomName.value))
  }

  let ID = localStorage.getItem('userId')
  $.ajax({
    url: 'https://karandash.pro/brief/save_data.php ',
    type: 'POST',
    data: {
      funk: 'addDetailRoom',
      userId: ID,
      arr,
    },
    success: function (data) {
      getUserData()
      scrollToTop()
    },
  })
}

function getAllCookiesExcept(excludeArray) {
  const localstorage = localStorage
  const result = []

  for (let i = 0; i < localstorage.length; i++) {
    const key = localstorage.key(i)
    const value = localstorage.getItem(key)
    const regex = /^room\|[\w\d]+$/
    if (
      !excludeArray.includes(key) &&
      regex.test(key) &&
      localstorage.getItem(key) != 'undefined'
    ) {
      const newKey = key.replace(/^room\|/, '')
      result.push([newKey, value])
    }
  }

  return result
}

function findChoosenRoom(index) {
  let result

  for (let j = index; j < roomArray.length; j++) {
    result = localStorage.getItem('room|' + roomArray[j][0])
    if (result != '0' && result && result != 'undefined') {
      return j
    }
  }
  defaultRoomEnd.value = true
  return index
}

function findBackRoom(index) {
  let result
  for (let m = index; m >= 0; m--) {
    result = localStorage.getItem('room|' + roomArray[m][0])
    if (result != '0' && result != undefined) {
      return m
    }
  }
  backButtonFunction('/brief_com/wishPage')
}

function findBackCustomRoom() {
  customCounterI.value = customCounterI.value - 1

  if (customCounterI.value == 0) {
    i.value = findBackRoom(i.value)
    roomName.value = roomArray[i.value][0]
    textArray.value = roomArray[i.value][1]
    roomCounter.value = Number(localStorage.getItem('room|' + roomName.value))
    defaultRoomEnd.value = false
  } else {
    customCounterI.value = customCounterI.value - 1
    roomName.value = customUserArray[customCounterI.value][0]
    textArray.value = ['Теплый пол', 'Кондиционирование']
    roomCounter.value = Number(customUserArray[customCounterI.value][1])
    customCounterI.value == 0 ? (customCounterI.value = 1) : customCounterI.value
  }
}

function backFunction() {
  if (defaultRoomEnd.value) {
    findBackCustomRoom()
  } else {
    defaultRoomEnd.value = false
    i.value = findBackRoom(i.value - 1)
    roomName.value = roomArray[i.value][0]
    textArray.value = roomArray[i.value][1]
    roomCounter.value = Number(localStorage.getItem('room|' + roomName.value))
  }
  $(document).ready(function () {
    getUserData()
  })
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const updateStyles = () => {
  if (roomArray[i.value][1].length < 8) {
    testareaStyle.value = 'lg:w-[1004px] w-full mt-5 md:mt-0'
  } else {
    testareaStyle.value = 'lg:w-[692px] w-full mt-5 md:mt-0'
  }
}
// Initial check
updateStyles()

// Watch for changes in short prop
watch(() => i.value, updateStyles)
watch(() => customCounterI.value, updateStyles)
let customArr = []
let defaultTextareaArr=['метраж',"другое","пол","стены","потолки"]
function fillCustomArr() {
  for (let j = 0; j < localStorage.getItem('room|'+roomName.value); j++) {
    let prefix = 'detailRoomData|' + roomName.value + j + '|'
    let besideArr=[]
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      if (key.startsWith(prefix)) {
        const item = key.replace(prefix, '')

        if (!textArray.value.includes(item) && !defaultTextareaArr.includes(item)) {
          besideArr.push(item)
        }
      }
    }
    customArr.push(besideArr)
    console.log(customArr)
  }
}
fillCustomArr()
</script>
<template>
  <div class="flex px-[22px] md:px-[100px]">
    <div class="md:mx-auto w-full max-w-[1920px]">
      <form @submit.prevent="sendRoomDetailData" id="bedroom" class="w-full">
        <div v-for="(item, index) in roomCounter" :key="index">
          <h1 class="H1 Text pb-10 uppercase">{{ roomName + ' ' + (index + 1) }}</h1>
          <div :id="roomName + index" class="w-full justify-between lg:flex">
            <LabelGroup :customArr="customArr[index]" :textArray="textArray"></LabelGroup>
            <div :class="testareaStyle">
              <p class="p4 Text mb-2">Пожелания по напольному покрытию</p>
              <textarea
                maxlength="800"
                class="textarea w-full mb-3 h-[140px]"
                placeholder="Укажите тип покрытия для пола (плитка, ламинат и т. д.) "
              ></textarea>
              <p class="p4 Text mb-2">Пожелания по отделке стен</p>
              <textarea
                maxlength="800"
                class="textarea mb-3 h-[140px]"
                placeholder="Укажите предпочтения по материалам и цвету. Если нужен декоративный элемент, уточните."
              ></textarea>
              <p class="p4 Text mb-2">Пожелания по отделке потолков</p>
              <textarea
                maxlength="800"
                class="textarea mb-3 h-[140px]"
                placeholder="Опишите предпочтения по отделке потолков (натяжной, подвесной, многоуровневый, или просто окрашенный.) Укажите предпочтения по материалам и цвету. Если нужен декоративный элемент (карнизы, лепнина, балки), уточните."
              ></textarea>
              <p class="p4 Text mb-2">Метраж помещения</p>
              <input
                id="small"
                class="input mb-3"
                type="number"
                oninput="this.value = this.value.slice(0, 50)"
                placeholder="Укажите число"
              />
              <p class="p4 Text mb-2">Другое</p>
              <textarea
                maxlength="800"
                class="textarea h-[140px]"
                placeholder="Если есть другие пожелания, опишите их здесь"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="w-full md:flex md:justify-between mt-5 md:mt-12">
          <BackButton @click="backFunction"></BackButton>
          <YellowButton
            type="sumbit"
            :arrow="true"
            class="md:w-[212px] w-full"
            text="Далее"
          ></YellowButton>
          <BackLink @click="backFunction"></BackLink>
        </div>
      </form>
    </div>
  </div>
</template>
