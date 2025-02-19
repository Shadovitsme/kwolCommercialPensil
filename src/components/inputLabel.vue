<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  userRoomCount: {
    type: Number,
  },
  count: { type: Array },
  long: { type: Boolean },
})

function checkInputValue(e) {
  if (e.target.value > 5) {
    e.target.value = 5
  } else if (e.target.value < 0) {
    e.target.value = 0
  } else if (e.target.value == "" || e.target.value == undefined) {
    e.target.value=0
  }
}

let padd = ref()
let labelStyle = ref()

function plus(index) {
  if (index >= 0 && index < 5) {
    props.count[index] = props.count[index] + 1
  }
  if (props.count[index] > 5) {
    props.count[index] = 5
  }
}

function minus(index) {
  if (index >= 0 && index < 5) {
    props.count[index] = (props.count[index] || 0) - 1
    if (props.count[index] < 0) {
      props.count[index] = 0
    }
  }
}

const updateStyles = () => {
  if (props.long) {
    labelStyle.value =
      'md:mr-5 rounded-[5px] text-Text p3 w-full absolute md:static top-0 z-20 flex my-auto outline-none placeholder:p3 placeholder:text-QuietText pl-4 py-3 border-[1px] border-Accent bg-DarkAccent overflow-hidden'
    padd.value = 'input text-center my-auto mx-3 w-full'
  } else {
    labelStyle.value =
      'md:mr-5 rounded-[5px] overflow-hidden text-Text p3 w-full absolute md:static top-0 z-20 flex my-auto outline-none placeholder:p3 placeholder:text-QuietText pl-4 py-3 border-[1px] border-Accent bg-DarkAccent '
    padd.value = 'input text-center my-auto mx-3 w-full'
  }
}

updateStyles()

// Watch for changes in short prop
watch(() => props.long, updateStyles)
</script>
<template>
  <div
    v-for="(item, index) in props.userRoomCount"
    class="md:flex md:h-[56px] md:static relative h-[143px]"
  >
    <input :class="labelStyle" placeholder="Название" />
    <div
      class="flex justify-center md:no-flex md:border-0 border-b-[1px] md:static absolute w-full md:w-fit top-10 border-x-[1px] md:p-0 px-4 py-6 border-QuietText rounded-b-[5px]"
    >
      <button
        name="minusButton"
        @click="minus(index)"
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
        :class="padd"
        :value="props.count[index]"
      />
      <button
        type="button"
        @click="plus(index)"
        name="plusButton"
        class="disabled:opacity-50 h-[48px] w-[48px] shrink-0 my-auto plusButton"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.input {
  background-color: var(--DarkAccent);
  padding: 20px;
  width: 52px;
  height: 58px;
  color: var(--Text);
  border-radius: 5px;
  vertical-align: top;
}

@media (max-width: 1024px) {
  .input {
    width: 100%;
  }
}
</style>
