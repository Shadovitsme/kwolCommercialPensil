<script setup>
import LabelGroup from './components/labelGroup.vue'
import YellowButton from './components/yellowButton.vue'
import $ from 'jquery'
import { jquery } from 'globals'
import { ref, watch } from 'vue'
import router from './router'

function sendRoomDetailData(e) {
  e.preventDefault()
  if (i.value++ < roomArray.length - 1) {
    roomName.value = roomArray[i.value][0]
    textArray.value = roomArray[i.value][1]
  } else router.replace({ path: '/linkDescribePage' })

  // $.ajax({
  //   url: 'https://karandash.pro/brief/save_data.php ',
  //   type: 'POST',
  //   data: {
  //     funk: 'addNamePhone',
  //     name: '$(this)[0][0].value',
  //     phone: '$(this)[0][1].value',
  //     town: '$(this)[0][2].value',
  //   },
  //   success: function (data) {
  //     // console.log(data)
  //   },
  // })
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
  ]]
let i = ref(0)
let roomName = ref(roomArray[i.value][0])
let textArray = ref(roomArray[i.value][1])
let testareaStyle = ref()

const updateStyles = () => {
  if (roomArray[i.value][1].length < 7) {
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
        <div id="bedroom">
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
