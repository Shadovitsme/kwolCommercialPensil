<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import YellowButton from './yellowButton.vue'
import { isEmptyObject } from 'jquery'

let showTextarea = ref(false)
let textInputValue = ref('')
let fileInputValue = ref(null)

let inputs = ref(1);


function test(e){
    console.log(e.target.value)
}

watch([textInputValue, fileInputValue], ([newTextValue, newFileValue]) => {
  showTextarea.value = newTextValue.length > 0 || newFileValue !== null; 
})


</script>
<!-- TODO ограничеть допустимые форматы файлов -->
<template>
  <div v-for="{ item } in inputs">
    <p class="p4 mb-2 text-Text">Ссылка на референс</p>
    <div class="flex mb-5">
        <div class=" mr-5 w-[607px]">
      <input
        :disabled="fileInputValue"
        class="input"
        type="text"
        placeholder="Вставьте ссылку"
        v-model="textInputValue"
      />
    </div>
      <label
        :disabled="textInputValue"
        class="yellowButton w-[816px] flex justify-center cursor-pointer"
      >
        <input
          type="file"
          class="hidden"
          :disabled="textInputValue.length > 0"
          @change="fileInputValue = $event.target.files[0]"
        />
        <span class="p3">или загрузите изображение</span>
      </label>
    </div>
    <p v-if="showTextarea" class="mb-2 p4 text-Text">Комментарий к референсу</p>
    <textarea
      v-if="showTextarea"
      placeholder="Опишите, что вам понравилось, а что, наоборот, не хотели бы реализовывать"
      class="textarea"
    ></textarea>
  </div>
</template>
