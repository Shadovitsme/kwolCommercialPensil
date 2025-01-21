<script setup>
import LabelGroup from './components/labelGroup.vue'
import YellowButton from './components/yellowButton.vue'
import $ from 'jquery'
import { jquery } from 'globals'
import { ref, watch } from 'vue'
import router from './router'
import { getCookie } from './utility/getCookie'

function createArrayForAjax(e) {
  let m = 1
  let roomArr = []
  const staticFields = ['пол', 'стены', 'потолки', 'метраж', 'другое']
  for (let i = 0; i <= roomCounter.value; i++) {
    let roomContentArr = []

    textArray.value.forEach((element) => {
      roomContentArr.push([element, e.target[m].value])
      m += 3
    })
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
  i.value = findChoosenRoom(i.value + 1) 
  if(i.value>=roomArray.length){console.log('aaaa')}

  roomName.value = roomArray[i.value][0]
  textArray.value = roomArray[i.value][1]
  roomCounter.value = Number(getCookie(roomName.value))
  let ID = getCookie('userId')

  $.ajax({
    url: 'https://karandash.pro/brief/save_data.php ',
    type: 'POST',
    data: {
      funk: 'addDetailRoom',
      userId: ID,
      arr,
    },
    success: function (data) {
      console.log(data)
    },
  })
}

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
let i = ref(findChoosenRoom(0))
let roomName = ref(roomArray[i.value][0])
let textArray = ref(roomArray[i.value][1])
let roomCounter = ref(Number(getCookie(roomName.value)))
let testareaStyle = ref()

function findChoosenRoom(index) {
  let result
  for (let i = index; i < roomArray.length; i++) {
    result = getCookie(roomArray[i][0])
    if (result != '0' && result && result!=undefined) {
      return i
    }
  }
  router.replace({ path: '/brief_com/wishPage' })
}

const updateStyles = () => {
  if (roomArray[i.value][1].length < 8) {
    testareaStyle.value = 'md:w-[1004px] w-full mt-5 md:mt-0'
  } else {
    testareaStyle.value = 'md:w-[916px] w-full mt-5 md:mt-0'
  }
}
// Initial check
updateStyles()

// Watch for changes in short prop
watch(() => roomArray[i.value], updateStyles)
</script>
<!-- в общем в рутах передавать сюда параметры и по ним выбирать значения -->
<template>
  <div class="flex px-[22px] md:px-[100px]">
    <div class="md:mx-auto w-full max-w-[1920px]">
      <form @submit.prevent="sendRoomDetailData" id="bedroom" class="w-full">
        <div v-for="(item, index) in roomCounter" :key="index">
          <h1 class="H1 Text pb-10 uppercase">{{ roomName }}</h1>
          <div id="bedroom0" class="w-full md:flex">
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
              <input class="input mb-3" type="number" placeholder="Укажите число" />
              <p class="p4 Text mb-2">Другое</p>
              <textarea
                class="textarea h-[140px]"
                placeholder="Если есть другие пожелания, опишите их здесь"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="w-full flex md:justify-end mt-9 md:mt-12">
          <YellowButton :arrow="true" class="mt-[34px] md:w-[212px]" text="Далее"></YellowButton>
        </div>
      </form>
    </div>
  </div>
</template>
