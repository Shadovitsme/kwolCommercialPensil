<script setup>
import YellowButton from './components/yellowButton.vue'
import router from './router'
import $ from 'jquery'
import { ref } from 'vue'
let userArray = ref([])
let sawYouBefore = ref(false)

function getMainUserData(e) {
  e.preventDefault()
  let name = e.target[0].value
  let phone = e.target[1].value
  let town = e.target[2].value
  if (!(name, phone, town) || phone.length < 11) {
    if (!name) {
      nameStyle.value = errorStyle
    } else {
      nameStyle.value = defaultStyle
    }
    if (!town) {
      townStyle.value = errorStyle
    } else {
      townStyle.value = defaultStyle
    }
    if (phone.length < 11) {
      PhoneStyle.value = errorStyle
    } else {
      PhoneStyle.value = defaultStyle
    }
  } else {
    nameStyle.value = defaultStyle
    PhoneStyle.value = defaultStyle
    townStyle.value = defaultStyle
    localStorage.setItem('commercial', 'true')
    $.ajax({
      url: 'https://karandash.pro/brief/userResult.php',
      type: 'GET',
    })
      .then(function (data) {
        userArray.value = Object.values(JSON.parse(data))
        if (userArray.value.find((element) => element['Phone'] == phone)) {
          sawYouBefore.value = true
        }
        return sawYouBefore.value
      })
      .done((data) => {
        // if (data) {
        //   alert('kogo i seee')
        // } else {
        $.ajax({
          url: 'https://karandash.pro/brief/save_data.php',
          type: 'POST',
          data: {
            funk: 'addNamePhone',
            name: e.target[0].value,
            phone: e.target[1].value,
            town: e.target[2].value,
          },
          success: function (data) {
            console.log(data)
            document.cookie = `userId=${data}; path=/; max-age=3600`
            localStorage.setItem('userId', data)
            router.replace({ path: '/brief_com/mainData' })
          },
        })
        // }
      })
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Находим все элементы с id="phone"
  var inputs = document.querySelectorAll('#phone')

  // Добавляем обработчики событий для каждого из них
  inputs.forEach(function (input) {
    input.addEventListener('input', mask)
    input.addEventListener('focus', mask)
    input.addEventListener('blur', mask)
  })

  function mask(event) {
    var blank = '8 (___) ___ __ __' // Маска с 8 в начале

    var i = 0
    var val = this.value.replace(/\D/g, '') // Убираем все нецифровые символы

    // Логика для замены 7, +7 и 9
    if (val.startsWith('7')) {
      val = '8' + val.slice(1) // Заменяем 7 на 8
    } else if (val.startsWith('9')) {
      val = '89' + val.slice(1) // Заменяем 9 на 89
    } else if (val.startsWith('+7')) {
      val = '8' + val.slice(2) // Заменяем +7 на 8
    }

    // Применяем маску
    this.value = blank.replace(/./g, function (char) {
      if (/[_\d]/.test(char) && i < val.length) return val.charAt(i++)

      return i >= val.length ? '' : char
    })

    // Если событие blur (потеря фокуса), очищаем поле, если введено только 2 символа
    if (event.type == 'blur') {
      if (this.value.length == 2) this.value = ''
    } else {
      setCursorPosition(this, this.value.length) // Устанавливаем курсор в конец
    }
  }

  function setCursorPosition(elem, pos) {
    elem.focus()

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos)
      return
    }

    if (elem.createTextRange) {
      var range = elem.createTextRange()
      range.collapse(true)
      range.moveEnd('character', pos)
      range.moveStart('character', pos)
      range.select()
      return
    }
  }
})

const defaultStyle = 'mb-6 input'
const errorStyle = 'mb-6 inputError'

let nameStyle = ref(defaultStyle)
let PhoneStyle = ref(defaultStyle)
let townStyle = ref(defaultStyle)
</script>

<template>
  <div class="flex px-[1.375rem] md:px-0">
    <div class="flex md:justify-between md:mx-auto max-w-[1920px] z-20">
      <div class="md:mx-6 lg:mx-[6.25rem] md:w-full">
        <div class="lg:w-[51.75rem] md:ml-5">
          <h1 class="H1 Text uppercase text-justify">Бриф, подготовленный</h1>
          <h1 class="speciall text-justify text-[40px] lg:text-[104px] mb-6">специально для вас</h1>
        </div>
        <p class="p3 mb-[4rem] h-12 Text laptop:mt-5 md:ml-5 tracking-tighter">
          Заполните бриф, чтобы мы могли сразу сориентировать вас по деталям и стоимости проекта
        </p>
        <div
          class="md:p-[3.75rem] md:mt-0 p-5 md:ml-1 border-[1px] border-[#E4A85E] rounded-[0.625rem]"
        >
          <h class="H3 Text uppercase"> Основные данные</h>
          <form @submit.prevent="getMainUserData" class="md:mt-8 mt-4 gap-y-6" id="page1">
            <input
              maxlength="30"
              :class="nameStyle"
              type="text"
              name="name"
              placeholder="Введите имя"
            />
            <input
              id="phone"
              maxlength="30"
              :class="PhoneStyle"
              name="phone"
              placeholder="Введите телефон"
            />
            <input
              maxlength="30"
              :class="townStyle"
              type="text"
              name="city"
              placeholder="Ваш город, улица, дом"
            />
            <YellowButton
              :arrow="true"
              class="md:w-[19.875rem] w-full"
              text="Перейти к брифу"
            ></YellowButton>
          </form>
        </div>
      </div>
      <div class="md:ml-16 mb-[10.59375rem] flex-none overflow-hidden hidden lg:block">
        <img
          class="h-[45.75rem] inline-block w-[30.8125rem] max-[62.5rem]:hidden my-auto"
          src="./images/pic.png"
        />
        <img
          class="h-[39.375rem] inline-block w-[26.375rem] max-[93.75rem]:hidden my-auto ml-5 rounded-[0.625rem]"
          src="./images/pic1.png"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<style>
@media screen and (max-width: 768px) {
  body {
    padding-top: 40px;
    background-size: contain;
  }
}

.inputError {
  font-family: 'Corsa Grotesk Regular';
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  background-color: var(--DarkAccent);
  padding: 20px;
  width: 100%;
  height: 68px;
  color: var(--Text);
  border-radius: 5px;
  vertical-align: top;
  border-color: #c63f3f;
  border-width: 1px;
}

.inputError::placeholder {
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  color: var(--QuietText);
}

.inputError:focus,
.inputError:active {
  border-color: #c63f3f;
  outline: none;
  border-width: 1px;
  border-width: 1px;
}

.inputError:focus::placeholder {
  transform: translateY(-20px);
  font-size: 12px;
  line-height: 12px;
}

@media screen and (max-width: 1024px) {
  .inputError {
    font-family: 'Corsa Grotesk Regular';
    font-size: 16px;
    font-weight: 400;
    line-height: 120%;
    border-color: #c63f3f;
    border-width: 1px;
    height: 58px;
    background-color: var(--DarkAccent);
    padding: 20px;
    width: 100%;
    color: var(--Text);
    border-radius: 5px;
  }
  .inputError::placeholder {
    font-family: 'Corsa Grotesk Regular';
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  }
}
</style>
