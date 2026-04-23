<script setup>
import {ref, onMounted, computed} from "vue";

const dishes = ref([])
const selectedDishes = ref([])

onMounted(() => {
  fetch("http://localhost:3000/dishes")
  .then(res => res.json())
      .then(data=>{
        dishes.value = data
      })
})

const total = computed(() => {
  return selectedDishes.value.reduce((sum, dish) => sum + Number(dish.price), 0)
})
</script>


<template>
  <div>
    <p>Выберите что вы ели</p>
    <div v-for="dish in dishes" :key="dish.id">
      <input type="checkbox" :value="dish" v-model="selectedDishes">
      <p>{{dish.name}}</p>
      <p>{{dish.price}}</p>
    </div>
  </div>

  <div v-if="selectedDishes.length > 0">
    <p>Итого: {{ total }} сом</p>

    <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Итого:${total}руб`">
  </div>

</template>


<style>

</style>