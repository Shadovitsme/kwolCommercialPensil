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
          <YellowButton
            type="button"
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
