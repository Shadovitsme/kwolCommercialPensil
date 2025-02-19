<script setup>
import LabelGroup from './components/labelGroup.vue'
import YellowButton from './components/yellowButton.vue'
import $ from 'jquery'
import { jquery } from 'globals'
import { ref, watch } from 'vue'
import router from './router'
import { getCookie } from './utility/getCookie'
import BackButton from './components/backButton.vue'
import BackLink from './components/backLink.vue'
import { contains } from 'jquery'

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
let roomName = ref(roomArray[i.value][0])
let textArray = ref(roomArray[i.value][1])
let roomCounter = ref(Number(localStorage.getItem('room|' + roomName.value)))
let testareaStyle = ref()

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

function sendRoomDetailData(e) {
  e.preventDefault()
  let arr = createArrayForAjax(e)
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
    console.log(roomName)

    roomCounter.value = Number(localStorage.getItem('room|'+roomName.value))
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
      // console.log(data)
      $('input').val(0)
      $('#small').val(undefined)
      $('textarea').val(undefined)
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
  router.replace({ path: '/brief_com/wishPage' })
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
    roomCounter.value = Number(localStorage.getItem('room|'+roomName.value))
  }
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
watch(() => roomArray[i.value], updateStyles)
watch(() => customUserArray[customCounterI.value], updateStyles)
</script>
<!-- в общем в рутах передавать сюда параметры и по ним выбирать значения -->
<template>
  <div class="flex px-[22px] md:px-[100px]">
    <div class="md:mx-auto w-full max-w-[1920px]">
      <form @submit.prevent="sendRoomDetailData" id="bedroom" class="w-full">
        <div v-for="(item, index) in roomCounter" :key="index">
          <h1 :id="roomName" class="H1 Text pb-10 uppercase">{{ roomName+' ' +(index+1) }}</h1>
          <div id="bedroom0" class="w-full justify-between lg:flex">
            <LabelGroup :textArray="textArray"></LabelGroup>
            <div :class="testareaStyle">
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
                class="textarea h-[140px]"
                placeholder="Если есть другие пожелания, опишите их здесь"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="w-full md:flex md:justify-between mt-5 md:mt-12">
          <BackButton @click="backFunction"></BackButton>
          <YellowButton type="sumbit" :arrow="true" class="md:w-[212px] w-full" text="Далее"></YellowButton>
          <BackLink @click="backFunction"></BackLink>
        </div>
      </form>
    </div>
  </div>
</template>
