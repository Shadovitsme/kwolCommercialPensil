<script setup>
import $ from 'jquery'
</script>

<script>
$(document).ready(function () {
  // ajax page 1
  $('input').attr('maxlength', 50)
  $('textarea').attr('maxlength', 800)
})
function redirect() {
  alert('hi')
}
</script>

<template>
  <router-view />
</template>
