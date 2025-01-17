<script setup>
import YellowButton from './components/yellowButton.vue'
import $ from 'jquery'

import router from './router'
</script>

<script>
function sendMainUserData(e) {
  e.preventDefault() // предотвращаем стандартное поведение формы
  router.replace({ path: '/brief_com/chooseRoom' })

  // let familyMembers = e.target[0].value
  // let pets = e.target[1].value
  // let soundless = e.target[2].checked
  // let furniture = e.target[4].checked
  // let hobby
  // if (!e.target[7].checked) {
  //   hobby = e.target[6].value
  // } else {
  //   hobby = '0'
  // }
  // let replane = e.target[8].checked
  // let visitors
  // if (e.target[10].checked) {
  //   visitors = e.target[10].value
  // } else if (e.target[11].checked) {
  //   visitors = e.target[11].value
  // } else {
  //   visitors = e.target[12].value
  // }
  // console.log(e.target[0].value)
  // $.ajax({
  //   url: 'https://karandash.pro/brief/save_data.php ',
  //   type: 'POST',
  //   data: {
  //     funk: 'addCommonData',
  //     familyMembers: familyMembers,
  //     pets: pets,
  //     soundless: soundless,
  //     furniture: furniture,
  //     hobby: hobby,
  //     replane: replane,
  //     visitors: visitors,
  //   },

  //   success: function (data) {
  //     console.log(data)
  //     router.replace({ path: '/chooseRoom' })
  //   },
  // })
}
</script>

<template>
  <div class="flex px-[22px] md:px-[100px]">
    <div class="md:mx-auto max-w-[1920px]">
      <h1 class="H1 Text mb-11 md:mb-9 uppercase">Укажите необходимые данные</h1>
      <form
        @submit.prevent="sendMainUserData"
        class="md:flex justify-between max-w-[1920px]"
        id="page2"
      >
        <div class="md:mr-16 md:w-[36vw]">
          <p class="p4 Text mb-2">Сфера деятельности (магазин, офис, кафе, салон красоты и т.д)</p>
          <input class="input mb-4 md:mb-10" type="text" placeholder="Укажите сферу деятельности" />
          <p class="p4 Text mb-2">Площадь помещения в м²</p>
          <input class="input mb-5 md:mb-10" type="number" placeholder="Укажите число" />
          <p class="H6 Accent">Есть необходимость звукоизоляции?</p>
          <div class="md:flex mt-5 md:mt-1 mb-5 md:mb-8">
            <div class="mr-5 ms:mb-1">
              <input class="radio" type="radio" name="soundless" value="1" checked="true" />
              <label class="p3 Text">Звукоизоляция нужна</label>
            </div>
            <div>
              <input class="radio" type="radio" name="soundless" value="0" />
              <label class="p3 Text">Звукоизоляция не нужна</label>
            </div>
          </div>

          <p class="H6 Accent">Есть ли у вас мебель?</p>
          <div class="flex mt-4 md:mt-2 md:mb-16 mb-5">
            <div class="mr-5">
              <input class="radio" type="radio" name="furniture" value="1" checked="true" />
              <label class="p3 Text">Да</label>
            </div>
            <div>
              <input class="radio" type="radio" name="furniture" value="0" />
              <label class="p3 Text">Нет</label>
            </div>
          </div>
        </div>
        <div class="md:w-[36vw]">
          <p class="p4 Text mb-2">
            Особенности зонирования (например, отдельные кабинеты, открытая планировка, зоны отдыха)
          </p>
          <textarea
            type="text"
            class="textarea mb-10"
            placeholder="Перечислите особенности зонирования"
          ></textarea>
          <p class="H6 Accent">Требуется ли перепланировка?</p>
          <div class="flex mt-4 md:mt-1.5 mb-4 md:mb-8">
            <div class="mr-5">
              <input class="radio" type="radio" name="replane" value="1" checked="true" />
              <label class="p3 Text">Да</label>
            </div>
            <div>
              <input class="radio" type="radio" name="replane" value="0" />
              <label class="p3 Text">Нет</label>
            </div>
          </div>
          <p class="H6 Accent mb-[14px]">Количество рабочих мест</p>
          <input class="input mb-4 md:mb-10" type="number" placeholder="Укажите число" />
          <div class="w-full md:mt-[75px] flex md:justify-end">
            <YellowButton :arrow="true" class="md:w-[212px]" text="Далее"></YellowButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
