<script setup>
import YellowButton from './components/yellowButton.vue'
import MainPage from './mainPage.vue';
</script>

<script>
function redirect() {
  alert('hi')
}
</script>

<template>
  <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
  </div>
  <router-view /></template>
