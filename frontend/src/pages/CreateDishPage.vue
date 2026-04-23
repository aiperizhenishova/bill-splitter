<script>
export default {
  data() {
    return {
      dishes: [],
      error: '',
      dishName: '',
      price: ''
    }
  },
  methods: {
    addDish() {
      if (this.dishName === '') {
        this.error = 'Введите название блюда: ';
        return;
      } else if (this.price === '') {
        this.error = 'Введите цену: ';
        return;
      }

      this.error = ''
      this.dishes.push({
        name: this.dishName,
        price: this.price
      })
    },

    deleteDish(index) {
      this.dishes.splice(index, 1)
    }

  }
}
</script>

<template>
  <div class="app">

    <p>Добавить блюдо</p>
    <input type="text" class="dishName" v-model="dishName" placeholder="название блюда: ">
    <input type="number" class="price" v-model="price" placeholder="цена: ">
    <p class = "error">{{error}}</p>
    <button @click="addDish" type="button">добавить</button>

    <p>Список блюд: </p>
    <div v-for="(item, index) in dishes" :key="index">
      <div class="dishList" >
        <p>{{item.name}}</p>
        <p>{{item.price}}</p>
        <button @click="deleteDish(index)" type="button" >X</button>
      </div>
    </div>

  </div>

</template>


<style scoped>
.app{
  width: 100%;
}
.dishName{
  margin: 10px;
  padding: 5px 10px;
  border-radius: 10px;
}
.dishName::placeholder {
  font-size: medium;
}
button{
  margin: 10px;
  padding: 5px 10px;
  color: black;
  font-size: medium;
  border-radius: 10px;
}
.price{
  margin: 10px;
  padding: 5px;
  border-radius: 10px;
}
.price::placeholder {
  font-size: medium;
}
.dishList{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: gray;
  color: black;
  width: 400px;
  border-radius: 10px;
  border: solid 1px white;
  margin: 10px;
  gap: 10px;
}
</style>
