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
  <div class="dish-container">
    <p class="dish-text">Выберите что вы ели</p>
    <div class="dishes-lists" v-for="dish in dishes" :key="dish.id">
      <input class="checkbox" type="checkbox" :value="dish" v-model="selectedDishes">
        <p class="name">{{dish.name}}</p>
        <p class="price">{{dish.price}}</p>
    </div>
  </div>

  <div  v-if="selectedDishes.length > 0">
    <p class="textTotalValue">Итого: {{ total }} сом</p>
    <div class="Qr-wrapper">
      <img class="qrCode" :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Итого:${total}руб`">
    </div>
  </div>

</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.dishes-lists{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
}

.dish-text{
  width: 100%;
  background-color: #F7F5F0;
  border: 1px solid #2D5A27;
  border-radius: 16px;
  padding: 5px 20px;
  margin: 0 0 15px;
}
.name{
  margin-right: auto;
}
.price{
  display: flex;
  margin-left: auto;
}
.textTotalValue{
  margin-left: auto;
  margin-top: 20px;
  margin-bottom: 25px;
  font-size: 15px;
  width: 60%;
  padding: 8px 10px;
  border-radius: 10px;
  color: #FFFFFF;
  border: 1px solid #2D5A27;
  background-color: #2D5A27;
}
.Qr-wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>