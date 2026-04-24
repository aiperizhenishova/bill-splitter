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

  mounted(){
    fetch("http://localhost:3000/dishes")
    .then(res => res.json())
    .then(data => {
      this.dishes = data;
    })
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


      fetch("http://localhost:3000/dishes", {
        method: 'POST',
            headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.dishName,
          price: this.price
        })
      })
          .then(res => res.json())
          .then(data => {
            this.dishes.push(data);
          })

      this.error = ''
      this.dishName = ''
      this.price = ''
    },

    async deleteDish(id) {
      try {
        const response = await fetch(`http://localhost:3000/dishes/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Ошибка удаления');
        }

        this.dishes = this.dishes.filter(dish => dish.id !== id);
        console.log('блюдо удалено');
      } catch (error) {
        console.log('не удалось удалить: ', error);
      }
    },

    copyLink() {
      this.shareLink = `${window.location.origin}/guest`
      navigator.clipboard.writeText(this.shareLink)
      alert('Ссылка скопирована!')
    }

  }
}
</script>

<template>
  <div class="app">
    <div class="addDish-container">
      <p class="text">Добавить блюдо</p>
      <input type="text" class="dishName" v-model="dishName" placeholder="название блюда: ">
      <input type="number" class="price" v-model="price" placeholder="цена: ">
      <p class = "error">{{error}}</p>
      <button @click="addDish" type="button" class="addBtn">добавить</button>
    </div>

    <div class="dishList-container">
      <p class="text">Список блюд: </p>
      <div class="dishes" v-for="dish in dishes" :key="dish.id">
        <div class="dishList" >
          <p class="name-dishList">{{dish.name}}</p>
          <p class="price-dishList">{{dish.price}} сом</p>
          <button class="deleteBtn" @click="deleteDish(dish.id)" type="button" >X</button>
        </div>
      </div>
    </div>

    <button class="shareBtn" @click="copyLink" type="button">Поделиться с гостями</button>
    <p v-if="shareLink">{{ shareLink }}</p>

  </div>

</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app{
  width: 100%;
}
.text{
  padding: 0 10px;
}
.dishName,
.price{
  font-size: 15px;
  width: 97%;
  margin: 10px 40px 10px 10px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid #2D5A27;
  background-color: #F7F5F0;
}
.addDish-container,
.dishList-container{
  width: 600px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.addBtn{
  margin-left: auto;
  font-size: 15px;
  width: 30%;
  padding: 8px 10px;
  border-radius: 10px;
  color: #FFFFFF;
  border: 1px solid #2D5A27;
  background-color: #2D5A27;
}

.dishes{
  width: 100%;
}

.dishList{
  display: flex;
  flex-direction: row;
  color: black;
  width: 500px;
  border-radius: 16px;
  border: solid 1px #2D5A27;
  margin: 10px 30px;
  padding: 8px 15px;
  gap: 20px;
}
.name-dishList{
  margin-right: auto;
}
.price-dishList{
  display: flex;
  margin-left: auto;
}
.deleteBtn{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 25px;
  border-radius: 10px;
  border: 1px solid #2D5A27;
}
.shareBtn{
  margin-left: auto;
  font-size: 15px;
  width: 30%;
  padding: 8px 10px;
  border-radius: 10px;
  color: #FFFFFF;
  border: 1px solid #2D5A27;
  background-color: #2D5A27;
}
</style>
