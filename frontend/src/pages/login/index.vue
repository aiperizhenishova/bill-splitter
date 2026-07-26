<script setup lang="ts">
import BaseButton from '@/shared/ui/BaseButton.vue';
import { IconSparkle } from '@tabler/icons-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/entities/user';
import BaseInput from '@/shared/ui/BaseInput.vue';
import ThemeToggle from '@/shared/ui/ThemeToggle.vue';

defineOptions({ name: 'LoginPage' });

const router = useRouter();
const { login, loading } = useAuth();
const email = ref('');
const password = ref('');

async function handleSubmit() {
  const ok = await login(email.value, password.value);
  if (ok) {
    router.push('/dashboard');
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-page__logo">
      <IconSparkle class="login-page__icon" />
      <h1 class="login-page__title">Bill Splitter</h1>
    </div>

    <ThemeToggle />

    <div class="login-page__heading">
      <h2 class="login-page__headline">Вход</h2>
      <p class="login-page__text">Войдите в свой аккаунт</p>
    </div>

    <form class="login-page__form" @submit.prevent="handleSubmit">
      <BaseInput v-model="email" type="email" placeholder="Email" required />
      <BaseInput
        v-model="password"
        type="password"
        placeholder="Пароль"
        required
      />

      <BaseButton
        variant="primary"
        size="md"
        class="login-page__button"
        :disabled="loading"
      >
        {{ loading ? 'Загрузка...' : 'Войти' }}
      </BaseButton>
    </form>

    <RouterLink to="/register" class="login-page__link">
      Нет аккаунта? Регистрация
    </RouterLink>
  </div>
</template>

<style lang="scss">
.login-page {
  position: relative;
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding: 1rem 1rem 2rem;
  justify-content: center;
  flex-direction: column;
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

  &__text {
    font-size: var(--font-size);
    font-weight: var(--font-weight-regular);
    text-align: center;
    color: var(--color-muted-purple);
  }

  &__headline {
    font-family: var(--font-heading), serif;
    color: var(--color-primary);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    letter-spacing: -0.03rem;
  }

  &__heading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2.3rem 0 1rem;
    gap: 0.4rem;
  }

  &__form {
    max-width: 28rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;
  }

  &__button {
    width: 100%;
    max-width: 28rem;
    margin-top: 0.5rem;
  }

  &__link {
    margin-top: 1rem;
    color: var(--color-primary);
    font-size: var(--font-size-sm);
    text-decoration: none;
  }
}
</style>
