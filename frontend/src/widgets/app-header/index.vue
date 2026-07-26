<script setup lang="ts">
import ThemeToggle from '@/shared/ui/ThemeToggle.vue';

defineOptions({ name: 'AppHeader' });
import { IconSparkle } from '@tabler/icons-vue';
</script>

<template>
  <header class="header">
    <slot />
    <div class="header__logo">
      <IconSparkle class="header__icon" stroke="1.8" />
      <h1 class="header__title">Bill Splitter</h1>
    </div>

    <p class="header__tagline">Разделите счёт честно и без споров</p>

    <ThemeToggle />
  </header>
</template>

<style lang="scss">
.header {
  position: relative;
  display: flex;
  width: 100%;
  padding: 1rem 1rem 2rem;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  background-color: var(--color-white);
  border-bottom: 0.1rem solid var(--color-light-purple-gray);

  :slotted(button) {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

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
    font-size: var(--font-size);
    font-weight: var(--font-weight-regular);
    text-align: center;
    color: var(--color-muted-purple);
  }
}
</style>
