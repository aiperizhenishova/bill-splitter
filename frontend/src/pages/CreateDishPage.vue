<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useDishes } from '@/composables/useDishes';

const { dishes, loading, error } = useDishes();

const dishName = ref<string>('');
const price = ref<string>('');
const shareLink = ref<string>('');

async function addDish() {
  if (dishName.value === '' || price.value === '') {
    error.value = 'Поля не должны быть пустыми';
    return;
  }

  console.log('its work');

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/dishes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: dishName.value,
        price: price.value,
      }),
    });

    const data = await res.json();
    dishes.value = [...dishes.value, data];
  } catch (error) {
    error.value = error.message;
  } finally {
    dishName.value = '';
    price.value = '';
  }
}

async function deleteDish(id: number) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/dishes/${id}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      return new Error('Ошибка удаления');
    }

    dishes.value = dishes.value.filter((dish) => dish.id !== id);
    console.log('блюдо удалено');
  } catch (error) {
    console.error('не удалось удалить: ', error);
  }
}

function copyLink() {
  shareLink.value = `${window.location.origin}/guest`;
  navigator.clipboard.writeText(shareLink.value);
  alert('Ссылка скопирована!');
}
</script>

<template>
  <div class="add-dish-page">
    <div class="add-dish-page-header">
      <h3 class="add-dish-page__title">Добавить блюдо</h3>

      <input
        type="text"
        v-model="dishName"
        placeholder="название блюда: "
        required
      />
      <input type="number" v-model="price" placeholder="цена: " required />

      <p class="add-dish-page-error">{{ error }}</p>
      <button class="add-dish-page__button" @click="addDish" type="button">
        добавить
      </button>
    </div>

    <div class="dish-list">
      <h3 class="dish-list__title">Список блюд:</h3>

      <p v-if="loading">Загрузка...</p>

      <div class="dish-item list-item" v-for="dish in dishes" :key="dish.id">
        <p class="dish-item name">{{ dish.name }}</p>
        <p class="dish-item price">{{ dish.price }} сом</p>
        <button
          class="dish-item__delete-btn"
          @click="deleteDish(dish.id)"
          type="button"
        >
          X
        </button>
      </div>
    </div>

    <button class="share-btn" @click="copyLink" type="button">
      Поделиться с гостями
    </button>
    <p v-if="shareLink">{{ shareLink }}</p>
  </div>
</template>

<style scoped lang="scss">
.add-dish-page {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 100vw;
  padding: 20px;
}

.add-dish {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__button {
    width: 30%;
    margin-left: auto;
  }
}

.add-dish-error {
  color: red;
  font-size: 13px;
  padding: 0 10px;
}

.dish-list {
  width: 100%;

  &__title {
    padding-bottom: 30px;
  }
}

.dish-item {
  &__delete-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 27px;
  }
}

.share-btn {
  width: 30%;
  margin-left: auto;
}
</style>
