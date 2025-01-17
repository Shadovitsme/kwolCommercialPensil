<script setup>
import YellowButton from './components/yellowButton.vue'
import router from './router'
import $ from 'jquery'
import { jquery } from 'globals'

function getMainUserData(e) {
  let name = e.target[0].value
  let phone = e.target[1].value
  let town = e.target[2].value
  if ((name, phone, town)) {
    $.ajax({
      url: 'https://karandash.pro/brief/save_data.php ',
      type: 'POST',
      data: {
        funk: 'addNamePhone',
        name: e.target[0].value,
        phone: e.target[1].value,
        town: e.target[2].value,
      },
      success: function (data) {
        console.log(data)
        router.replace({ path: '/brief_com/mainData' })
      },
    })
  } else alert('Не все поля заполнены!!!')
}
</script>

<template>
  <div class="flex px-[22px] md:px-0">
    <div class="flex md:justify-between md:mx-auto max-w-[1920px] z-20">
      <div class="md:ml-[100px] md:w-full">
        <div class="mt-10 md:w-[51.75rem] md:ml-5">
          <h1 class="H1 Text uppercase text-justify">Бриф, подготовленный</h1>
          <h1 class="speciall text-justify text-[104px]">специально для вас</h1>
        </div>
        <p
          class="p3 h-12 Text min-[100px]:mt-4 laptop:mt-5 mb-[50px] md:mb-[64px] md:ml-5 tracking-tighter"
        >
          Заполните бриф, чтобы мы могли сразу сориентировать вас по деталям и стоимости проекта
        </p>
        <div class="md:p-[60px] p-5 md:ml-1 border-[1px] border-[#E4A85E] rounded-[10px]">
          <h class="H3 Text uppercase"> Основные данные</h>
          <form @submit.prevent="getMainUserData" class="md:mt-8 mt-4" id="page1">
            <input
              maxlength="30"
              type="text"
              class="input mb-6"
              name="name"
              placeholder="Введите имя"
            />
            <input
              maxlength="30"
              class="input mb-6"
              type="number"
              name="phone"
              placeholder="Введите телефон"
            />
            <input maxlength="30" class="input" type="text" name="city" placeholder="Ваш город" />
            <YellowButton
              :arrow="true"
              class="mt-[34px] md:w-[318px]"
              text="Перейти к брифу"
            ></YellowButton>
          </form>
        </div>
      </div>
      <div class="md:ml-16 mb-[169.5px] flex-none overflow-hidden max-[1000px]:hidden visible">
        <img
          class="h-[732px] inline-block w-[493px] max-[1000px]:hidden my-auto"
          src="./images/pic.png"
        />
        <img
          class="h-[630px] inline-block w-[422px] max-[1500px]:hidden my-auto ml-5 rounded-[10px]"
          src="./images/pic1.png"
        />
      </div>
    </div>
  </div>
</template>
