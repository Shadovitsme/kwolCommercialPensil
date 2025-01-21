<script setup>
import { errorMessages } from 'vue/compiler-sfc'
import LabelAdditional from './components/labelAdditional.vue'
import YellowButton from './components/yellowButton.vue'
import router from './router'
import errorMessage from './components/errorMessage.vue'
import { ref } from 'vue'

let arr = ['Ресепшн', 'Кабинет', 'Кухня', 'Санузел', 'Переговорные', 'Кладовая', 'Склад']
</script>

<script>
let userRoomCount = ref(0)
let count = ref([0,0,0,0,0,0,0,0,0,0])

function addRoom() {
  userRoomCount.value++
  count.value.push(0)
}
let error = ref(false)
function redirect(e) {
  e.preventDefault() // предотвращаем стандартное поведение формы
  let hallway = e.target[1].value
  let childRoom = e.target[4].value
  let kitchen = e.target[7].value
  let welcomeroom = e.target[10].value
  let bedroom = e.target[13].value
  let clotheRoom = e.target[16].value
  let balcone = e.target[19].value

  if (
    (hallway !== null && hallway !== undefined && hallway !== '' && hallway !== '0') ||
    (childRoom !== null && childRoom !== undefined && childRoom !== '' && childRoom !== '0') ||
    (kitchen !== null && kitchen !== undefined && kitchen !== '' && kitchen !== '0') ||
    (welcomeroom !== null &&
      welcomeroom !== undefined &&
      welcomeroom !== '' &&
      welcomeroom !== '0') ||
    (bedroom !== null && bedroom !== undefined && bedroom !== '' && bedroom !== '0') ||
    (clotheRoom !== null && clotheRoom !== undefined && clotheRoom !== '' && clotheRoom !== '0') ||
    (balcone !== null && balcone !== undefined && balcone !== '' && balcone !== '0')
  ) {
    router.replace({ path: '/brief_com/wishPage' })
    // $.ajax({
    //   url: "save_data.php",
    //   type: "POST",
    //   data: {
    //     funk: "addRoomCount",
    //     прихожая: hallway,
    //     детская: childRoom,
    //     кухня: kitchen,
    //     гостиная: welcomeroom,
    //     спальня: bedroom,
    //     гардеробная: clotheRoom,
    //     балкон: balcone,
    //     столовая: dinnerRoom,
    //     кладовая: storageRoom,
    //     ванная: bathroom,
    //     кабинет: cabinet,
    //     гостевой_санузел: welcomeBathroom,
    //     другое: otherRooms,
    //   },
    //   success: function (data) {
    //     window.location.replace("./wishesPage.html");
    //   },
    // });
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
// TODO вывести в отдельный фаил и вызвать


function plus(index) {
  if (index >= 0 && index < count.value.length) {
    count.value[index] = (count.value[index] || 0) + 1
  }
}

function minus(index) {
  if (index >= 0 && index < count.value.length) {
    count.value[index] = (count.value[index] || 0) - 1
    if (count.value[index] < 0) {
      count.value[index] = 0
    }
  }
}

// function redirect() {
//   router.replace({ path: '/brief_com/wishPage' })
// }
</script>

<template>
  <div class="flex px-[22px] md:px-[100px]">
    <div class="md:mx-auto w-full max-w-[1920px] relative h-[776px] max-h-[776px]">
      <errorMessage v-if="error" class="absolute right-0 bottom-[84px]"></errorMessage>
      <form @submit.prevent="redirect" id="page3" class="w-full h-full">
        <h1 class="H1 Text pb-10 uppercase">Выберите комнаты</h1>
        <div
          class="w-full md:mr-16 grid grid-cols-1 md:grid-cols-4 gap-y-5 md:gap-y-5 md:gap-x-[52px]"
        >
          <LabelAdditional :short="true" v-for="item in arr" :text="item"></LabelAdditional>
          <div
            v-for="(item,index) in userRoomCount"
            class="md:flex md:h-[56px] md:static relative h-[143px]"
          >
            <input
              class="md:mr-5 rounded-[5px] text-Text p3 w-full md:w-[199px] absolute md:static top-0 z-20 flex my-auto outline-none placeholder:p3 placeholder:text-QuietText pl-4 py-3 border-[1px] border-Accent bg-DarkAccent"
              placeholder="Название"
            />
            <div
              class="flex justify-center md:no-flex md:border-0 border-b-[1px] md:static absolute top-10 border-x-[1px] md:p-0 px-4 py-6 border-QuietText rounded-b-[5px]"
            >
              <button
                name="minusButton"
                @click="minus(index)"
                type="button"
                class="disabled:opacity-50 h-[48px] w-[48px] shrink-0 my-auto minusButton"
              ></button>
              <input class="input text-center my-auto mx-3"  :value="count[index]"  />
              <button
                type="button"
                @click="plus(index)"
                name="plusButton"
                class="disabled:opacity-50 h-[48px] w-[48px] shrink-0 my-auto plusButton"
              ></button>
            </div>
          </div>
          <YellowButton
            v-if="userRoomCount < 9"
            type="button"
            @click="addRoom"
            class="w-full"
            text="Добавить помещение"
            :arrow="false"
          ></YellowButton>
        </div>

        <div class="w-full flex md:justify-end mt-9 md:mt-12">
          <YellowButton
            :arrow="true"
            class="mt-[34px] md:w-[212px] absolute right-0 bottom-0"
            text="Далее"
          ></YellowButton>
        </div>
      </form>
    </div>
  </div>
</template>
