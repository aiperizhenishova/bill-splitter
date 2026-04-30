<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useDishes } from '@/composables/useDishes';
import { Dish } from '@/types/dish';

const { dishes, loading, error } = useDishes();
const selectedDishes = ref<Dish[]>([]);

const total = computed(() => {
  return selectedDishes.value.reduce(
    (sum, dish) => sum + Number(dish.price),
    0,
  );
});
</script>

<template>
  <div class="guest-page">
    <h3 class="guest-page__title">Выберите что вы ели</h3>

    <div class="guest-page__list">
      <p v-if="loading">Загрузка...</p>

      <div
        class="guest-page__item list-item"
        v-for="dish in dishes"
        :key="dish.id"
      >
        <input
          class="guest-page__checkbox"
          type="checkbox"
          :value="dish"
          v-model="selectedDishes"
        />
        <span class="guest-page name">{{ dish.name }}</span>
        <span class="guest-page price">{{ dish.price }} сом</span>
      </div>
    </div>

    <div v-if="selectedDishes.length > 0" class="total-section">
      <div class="total-section__value">Итого: {{ total }} сом</div>
      <div class="total-section__qr-wrapper">
        <img
          class="total-section__qr-code"
          alt="qrCode"
          :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Итого:${total}руб`"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.guest-page {
  display: flex;
  flex-direction: column;
  padding: 20px;

  &__list {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  &__checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    width: 20px;
    height: 20px;
  }
}

.total-section {
  display: flex;
  flex-direction: column;

  &__value {
    width: 30%;
    margin-left: auto;
    font-size: 15px;
    padding: 8px 10px;
    border-radius: var(--border-radius);
    color: var(--color-white);
    border: 1px solid var(--color-primary);
    background-color: var(--color-primary);
    cursor: pointer;
    margin-bottom: 30px;
  }

  &__qr-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
