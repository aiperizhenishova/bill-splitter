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

    <p>Добавить блюдо</p>
    <input type="text" class="dishName" v-model="dishName" placeholder="название блюда: ">
    <input type="number" class="price" v-model="price" placeholder="цена: ">
    <p class = "error">{{error}}</p>
    <button @click="addDish" type="button" class="addBtn">добавить</button>

    <p>Список блюд: </p>
    <div class="dishes" v-for="dish in dishes" :key="dish.id">
      <div class="dishList" >
        <p>{{dish.name}}</p>
        <p>{{dish.price}}</p>
        <button class="deleteBtn" @click="deleteDish(dish.id)" type="button" >X</button>
      </div>
    </div>

    <button @click="copyLink" type="button">Поделиться с гостями</button>
    <p v-if="shareLink">{{ shareLink }}</p>

  </div>

</template>


<style scoped>
.app{
  width: 100%;
}
.dishName{
  width: 70%;
  margin: 10px;
  padding: 5px 10px;
  border-radius: 10px;
  border: 1px solid #2D5A27;
  background-color: #F7F5F0;
}

.price{
  width: 70%;
  margin: 10px;
  padding: 5px 10px;
  border-radius: 10px;
  border: 1px solid #2D5A27;
  background-color: #F7F5F0;
}
.addBtn{
  width: 50%;
  margin: 10px;
  padding: 5px 10px;
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
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  color: black;
  width: 400px;
  border-radius: 10px;
  border: solid 1px #2D5A27;
  margin: 10px;
  gap: 10px;
}
.deleteBtn{
  width: 50px;
}
</style>
