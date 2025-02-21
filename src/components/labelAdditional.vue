<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  text: {
    type: String,
  },
  short: {
    type: Boolean,
  },
})

let count = ref(0)

function plus() {
  count.value = count.value + 1
  count.value = count.value >= 5 ? 5 : count.value
  return false
}

function minus() {
  count.value = count.value - 1
  count.value = count.value <= 0 ? 0 : count.value
  return false
}

function checkInputValue(e) {
  if (e.target.value > 5) {
    e.target.value = 5
  } else if (e.target.value < 0) {
    e.target.value = 0
  } else if (e.target.value == '' || e.target.value == undefined) {
    e.target.value = 0
  }
}

let padd = ref()
let labelStyle = ref()
const updateStyles = () => {
  if (props.short) {
    labelStyle.value =
      'labelWrapper md:mr-5 w-full overflow-hidden h-fit  absolute md:static top-0 z-20 flex my-auto'
    padd.value = 'md:flex md:h-fit md:static  relative h-[143px]'
  } else {
    labelStyle.value =
      'labelWrapper md:mr-5 w-full overflow-hidden md:w-[460px] absolute md:static top-0 z-20 flex my-auto '
    padd.value = 'md:flex md:h-fit md:static relative h-[143px]'
  }
}

// Initial check
updateStyles()

// Watch for changes in short prop
watch(() => props.short, updateStyles)
</script>

<template>
  <div :class="padd">
    <div :class="labelStyle">
      <p class="p3 Text my-auto break-keep">{{ text }}</p>
    </div>
    <div
      class="flex justify-center md:no-flex md:border-0 border-b-[1px] md:static absolute w-full md:w-fit top-10 border-x-[1px] md:p-0 px-4 py-6 border-QuietText rounded-b-[5px]"
    >
      <button
        name="minusButton"
        :onclick="minus"
        type="button"
        class="disabled:opacity-50 h-[48px] w-[48px] shrink-0 my-auto minusButton"
      ></button>
      <input
        @change="
          (e) => {
            checkInputValue(e)
          }
        "
        type="number"
        class="input text-center my-auto mx-3"
        :value="count"
      />
      <button
        type="button"
        :onclick="plus"
        name="plusButton"
        class="disabled:opacity-50 h-[48px] w-[48px] shrink-0 my-auto plusButton"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.labelWrapper {
  background-color: var(--DarkAccent);
  border-width: 1px;
  border-color: var(--Accent);
  border-radius: 5px;
  padding-block: 12px;
  padding-left: 16px;
  height: fit-content;
}

.input {
  background-color: var(--DarkAccent);
  padding: 20px;
  width: 52px;
  height: 58px;
  color: var(--Text);
  border-radius: 5px;
  vertical-align: top;
}

.input::placeholder {
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  color: var(--QuietText);
}

.input:focus {
  border-color: var(--Accent);
  outline: none;
  border-width: 1px;
}

.input:active {
  border-color: var(--Accent);
  outline: none;
  border-width: 1px;
}

.input:focus::placeholder {
  transform: translateY(-20px);
  font-size: 12px;
  line-height: 12px;
}

@media screen and (max-width: 1024px) {
  .labelWrapper {
    height: 44px;
    padding-left: 12px;
  }
  .input {
    height: 58px;
    width: 100%;
  }

  .textarea {
    height: 120px;
  }

  .input::placeholder {
    font-family: 'Corsa Grotesk Regular';
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  }
}
</style>
