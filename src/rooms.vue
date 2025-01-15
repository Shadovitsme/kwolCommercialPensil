<script setup >
import LabelGroup from './components/labelGroup.vue';
let textArray =  ['Ресепшн', 'Кабинет', 'Кухня', 'Санузел', 'Переговорные', 'Кладовая', 'Склад', 'Склад']
</script>

<template>
    <LabelGroup :textArray="textArray"></LabelGroup>
</template>