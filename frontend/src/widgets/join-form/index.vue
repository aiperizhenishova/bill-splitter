<script setup lang="ts">
import BaseInput from '@/shared/ui/BaseInput.vue';
import { ref } from 'vue';
import { IconSparkle } from '@tabler/icons-vue';
import BaseButton from '@/shared/ui/BaseButton.vue';
import ThemeToggle from '@/shared/ui/ThemeToggle.vue';

defineOptions({ name: 'JoinForm' });

const name = ref('');
const emit = defineEmits<{ join: [name: string] }>();
</script>

<template>
  <div class="join-page">
    <ThemeToggle />

    <div class="join-page__logo">
      <IconSparkle class="join-page__icon" />
      <h1 class="join-page__title">Bill Splitter</h1>
    </div>

    <p class="join-page__tagline">Разделите счёт честно и без споров</p>

    <div class="join-page__form">
      <BaseInput
        v-model="name"
        class="join-page__name-input"
        type="text"
        placeholder="Имя"
        required
      />

      <BaseButton
        variant="primary"
        size="md"
        :disabled="!name.trim()"
        @click="emit('join', name.trim())"
      >
        Вход
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss">
.join-page {
  position: relative;
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;

  &__logo {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  &__icon {
    color: var(--color-icon);
  }

  &__title {
    font-family: var(--font-heading), serif;
    color: var(--color-primary);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-regular);
    letter-spacing: -0.03rem;
  }

  &__tagline {
    padding-bottom: 1.5rem;
    font-size: var(--font-size);
    font-weight: var(--font-weight-regular);
    text-align: center;
    color: var(--color-muted-purple);
  }

  &__form {
    max-width: 28rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  &__name-input {
    flex: 1;
  }
}
</style>
