<script setup>
import { ref, watch } from 'vue'
import YellowButton from './components/yellowButton.vue'
import router from './router'
import AddCardButton from './components/addCardButton.vue'
import ContentRefCard from './components/contentRefCard.vue'
import $ from 'jquery'
import { getCookie } from './utility/getCookie'
import BackButton from './components/backButton.vue'
import BackLink from './components/backLink.vue'
let refArray = ref([])
let haveLink = ref()
let textInputValue = ref('')
let fileInputValue = ref('')
let textareaValue = ref('')
let alreadyExist = ref(false)
let changeIndex = ref()
const modalVisible = ref(false)

function toggleModal(data) {
  if (data) {
    textInputValue.value = ''
    fileInputValue.value = ''
    textareaValue.value = ''
  }
  modalVisible.value = !modalVisible.value
}

function openCard(index) {
  textareaValue.value = refArray.value[index][1]
  if (refArray.value[index][3]) {
    textInputValue.value = refArray.value[index][2]
  } else {
    fileInputValue.value = refArray.value[index][0]
  }
  alreadyExist.value = true
  changeIndex.value = index
  toggleModal()
}

async function saveFile(photo) {
  let formData = new FormData()
  formData.append('photo', photo)
  formData.append('name', 'test.phg')
  try {
    const response = await fetch('https://karandash.pro/brief/uploadImage.php', {
      method: 'POST',
      body: formData,
    })
    if (response.status === 200) {
      const data = await response.json()
      console.log('Success', data)
    } else {
      console.log('Server error', data.error.message)
    }
  } catch (error) {
    console.log(error)
  }
}

function changeInputCount(e) {
  e.preventDefault()
  let ID = localStorage.getItem('userId')
  let dataArr = []

  refArray.value.forEach((element) => {
    if (element[3]) {
      dataArr.push([element[0], element[1]])
    } else {
      setTimeout(() => {
        saveFile(element[0])
      })
      let elemName = '../brief/clientsRefs/' + element[0]['name']
      dataArr.push([elemName, element[1]])
    }
  })

  $.ajax({
    url: 'https://karandash.pro/brief/save_data.php',
    type: 'POST',
    data: {
      funk: 'addRefs',
      userId: ID,
      dataArr,
    },
    success: function (data) {
      router.replace({ path: '/brief_com/thanksPage' })
    },
  })
}

function addRef(e) {
  e.preventDefault()
  let description = textareaValue.value
  let file = ref()
  if (alreadyExist.value) {
    if (textInputValue.value) {
      file.value = textInputValue.value
      haveLink.value = true

      refArray.value[changeIndex.value] = [
        file.value,
        description,
        textInputValue.value,
        haveLink.value,
      ]
    } else {
      file.value = fileInputValue.value
      haveLink.value = false
      refArray.value[changeIndex.value] = [file.value, description, file.value.name, haveLink.value]
    }
  } else {
    if (textInputValue.value) {
      file.value = textInputValue.value
      haveLink.value = true
      refArray.value.push([file.value, description, textInputValue.value, haveLink.value])
    } else {
      file.value = fileInputValue.value
      haveLink.value = false
      refArray.value.push([file.value, description, file.value.name, haveLink.value])
    }
  }
  alreadyExist.value = NaN
  textInputValue.value = ''
  fileInputValue.value = ''
  textareaValue.value = ''
  toggleModal(true)
}

let src = ref('')
function changeSrc() {
  src.value = URL.createObjectURL(fileInputValue.value)
}

function removeCard(getItem) {
  refArray.value = refArray.value.filter((item) => item !== getItem)
}

function checkBackLink() {
  if (localStorage.getItem('commercial') == 'true') {
    router.replace('/brief_com/rooms')
  }
  else{
    history.back()
  }
}
</script>
<template>
  <!-- modal -->
  <div v-if="modalVisible" class="fixed z-20 top-0 bottom-0 right-0 left-0 pt-[3.75rem] flex">
    <div
      @click="toggleModal"
      class="fixed z-30 bottom-0 top-0 right-0 left-0 backdrop-blur-md backdrop-brightness-[0.3]"
    ></div>

    <form
      @submit.prevent="addRef"
      class="md:h-[60rem] relative z-50 w-full md:w-[47.9375rem] mx-auto pt-7 pb-5 px-5 md:p-[3.75rem] rounded-[0.625rem] border-[0.0625rem] bg-background border-Accent"
    >
      <div
        @click="toggleModal"
        class="cross absolute right-2 top-2 md:right-8 md:top-8 h-7 w-7"
      ></div>
      <p class="text-Text H2 md:text-center">ДОПОЛНИТЕЛЬНЫЕ ПОЖЕЛАНИЯ</p>
      <p class="text-Text p3 md:p3 md:text-center md:my-8 mt-1.5 mb-6">
        Вы можете поделиться примерами интерьеров, которые отражают ваши пожелания и предпочтения
      </p>
      <p class="text-Text mb-2 p4">Добавьте ссылку на изображение, которое вам понравилось</p>
      <input
        v-if="!fileInputValue"
        class="input mb-8"
        placeholder="Вставьте ссылку"
        type="text"
        v-model="textInputValue"
      />

      <div v-if="fileInputValue" class="p-3 mb-2 rounded-[5px] flex bg-DarkAccent h-16 relative">
        <img :src="src" class="h-full my-auto rounded-[2px]" />
        <p class="text-Text p3 ml-3 my-auto">{{ fileInputValue.name }}</p>
        <button @click="fileInputValue = ''" class="trash top-5 absolute right-3"></button>
      </div>
      <p class="text-Text mb-2 p4">Или загрузите файл с вашего устройста</p>

      <!-- fileInput -->

      <label
        v-if="!textInputValue && !fileInputValue"
        class="bg-DarkAccent hover:bg-background active:bg-DarkAccent w-full flex justify-center cursor-pointer h-[210px] md:h-[360px] rounded-[10px]"
      >
        <input
          accept=".jpg,.jpeg,.png,.webp"
          type="file"
          class="hidden"
          @change="
            (e) => {
              fileInputValue = e.target.files[0]
              changeSrc()
            }
          "
        />
        <div class="download"></div>
      </label>
      <!-- fileInput -->

      <textarea
        v-model="textareaValue"
        placeholder="Опишите, что вам понравилось, а что, наоборот, не хотели бы реализовывать"
        class="bg-DarkAccent hover:bg-background active:bg-DarkAccent w-full flex justify-center cursor-pointer h-[210px] max-h-[210px] md:max-h-[360px] md:h-[360px] rounded-[10px] text-Text p-5 placeholder:text-QuietText p3 active:border-[1px] active:border-Accent outline-none focus:border-[1px] focus:border-Accent"
        v-if="textInputValue || fileInputValue"
      ></textarea>

      <p class="p5 text-QuietText mt-2">Максимальный размер 10 Мб</p>
      <p class="p5 text-QuietText mb-8">Доступные форматы JPG, PNG, WEBP</p>

      <YellowButton text="Добавить" :arrow="false" class="w-full h-11"></YellowButton>
    </form>
  </div>
  <!-- modal -->
  <div class="flex relative px-[22px] md:px-[100px]">
    <div class="md:mx-auto w-full max-w-[1920px]">
      <form @submit.prevent="changeInputCount" id="page3" class="w-full h-full">
        <h1 class="H1 Text md:mb-10 mb-4 uppercase">ДОПОЛНИТЕЛЬНЫЕ ПОЖЕЛАНИЯ</h1>
        <p class="p3 Text">
          Если у вас есть референсы/примеры того, что вы бы хотели видеть, прикрепите их ниже
          ссылками или изображениями.
        </p>
        <p class="p3 text-Text mt-3 mb-4">
          Вы можете добавить <a class="speciall text-[28px] md:text-[28px]"> до 10 референсов.</a>
        </p>

        <div class="md:grid md:grid-cols-6 md:gap-x-5 md:gap-y-20">
          <AddCardButton v-if="refArray.length < 10" @click="toggleModal"></AddCardButton>
          <ContentRefCard
            v-for="(item, index) in refArray"
            :comment="item[1]"
            :href="item[2]"
            :file="item[0]"
            :haveLink="item[3]"
            @cross-click="removeCard(item)"
            @card-click="openCard(index)"
          ></ContentRefCard>
        </div>
        <div class="w-full md:flex md:justify-between mt-6 md:mt-12">
          <BackButton @click="checkBackLink()"></BackButton>
          <YellowButton
            :arrow="true"
            class="mt-[34px] w-full md:w-[212px]"
            text="Далее"
          ></YellowButton>
          <BackLink @click="checkBackLink()"></BackLink>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.download {
  background: no-repeat
    url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDEiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MSA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzkwMF8yNTU4NSkiPgo8cGF0aCBkPSJNMTIuMTY3IDE5Ljk5OThMMjAuNTAwMyAyOC4zMzMyTTIwLjUwMDMgMjguMzMzMkwyOC44MzM3IDE5Ljk5OThNMjAuNTAwMyAyOC4zMzMyTDIwLjUwMDMgNi42NjY1IiBzdHJva2U9IiNGNUYyRUMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTAuNSAzMy4zMzM1SDMwLjUiIHN0cm9rZT0iI0Y1RjJFQyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfOTAwXzI1NTg1Ij4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC41KSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPg==');
  width: 40px;
  height: 40px;
  margin: auto;
}
.cross {
  background: no-repeat
    url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE4Ljg5MDYgNy4xMTg2NUwxMy45NDA1IDEyLjA2NzdMOC45OTE0NiA3LjExODY1TDcuMzQxOCA4Ljc2ODMyTDEyLjI5MDggMTMuNzE3M0w3LjM0MTggMTguNjY2M0w4Ljk5MTQ2IDIwLjMxNkwxMy45NDA1IDE1LjM2N0wxOC44OTA2IDIwLjMxNkwyMC41NDAzIDE4LjY2NjNMMTUuNTkxMyAxMy43MTczTDIwLjU0MDMgOC43NjgzMkwxOC44OTA2IDcuMTE4NjVaIiBmaWxsPSIjRjVGMkVDIi8+Cjwvc3ZnPg==');
}
.trash {
  background: no-repeat
    url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNy4zMzM1IDhWMTcuMzMzM0MxNy4zMzM1IDE4LjgwNjEgMTYuMTM5NiAyMCAxNC42NjY4IDIwSDkuMzMzNUM3Ljg2MDc0IDIwIDYuNjY2ODMgMTguODA2MSA2LjY2NjgzIDE3LjMzMzNWOEg1LjMzMzVWNi42NjY2N0g5LjMzMzVWNS4zMzMzM0M5LjMzMzUgNC41OTY5NSA5LjkzMDQ1IDQgMTAuNjY2OCA0SDEzLjMzMzVDMTQuMDY5OSA0IDE0LjY2NjggNC41OTY5NSAxNC42NjY4IDUuMzMzMzNWNi42NjY2N0gxOC42NjY4VjhIMTcuMzMzNVpNOC4wMDAxNiA4VjE3LjMzMzNDOC4wMDAxNiAxOC4wNjk3IDguNTk3MTIgMTguNjY2NyA5LjMzMzUgMTguNjY2N0gxNC42NjY4QzE1LjQwMzIgMTguNjY2NyAxNi4wMDAyIDE4LjA2OTcgMTYuMDAwMiAxNy4zMzMzVjhIOC4wMDAxNlpNMTAuNjY2OCA1LjMzMzMzVjYuNjY2NjdIMTMuMzMzNVY1LjMzMzMzSDEwLjY2NjhaIiBmaWxsPSIjRjVGMkVDIi8+Cjwvc3ZnPg==');
  width: 24px;
  height: 24px;
}
</style>
