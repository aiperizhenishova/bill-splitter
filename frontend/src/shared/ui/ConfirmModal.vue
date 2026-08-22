<script setup lang="ts">
defineOptions({ name: 'ConfirmModal' });
import BaseButton from '@/shared/ui/BaseButton.vue';

defineProps<{
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}>();

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>

<template>
  <div class="confirm-modal" @click.self="emit('cancel')">
    <div class="confirm-modal__window">
      <h3 class="confirm-modal__title">{{ title }}</h3>
      <p v-if="description" class="confirm-modal__description">
        {{ description }}
      </p>

      <div class="confirm-modal__actions">
        <BaseButton variant="secondary" @click="emit('cancel')">
          {{ cancelText ?? 'Отмена' }}
        </BaseButton>
        <BaseButton variant="primary" @click="emit('confirm')">
          {{ confirmText ?? 'Подтвердить' }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.confirm-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  padding: 1rem;

  &__window {
    width: 100%;
    max-width: 26rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: var(--color-white);
    border-radius: var(--border-radius-md);
    border: 0.1rem solid var(--color-light-lavender);
  }

  &__title {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-regular);
    text-align: left;
    color: var(--color-dark);
    margin: 0 0 0.5rem;
  }

  &__description {
    text-align: left;
    font-size: var(--font-size);
    color: var(--color-muted-purple);
    margin: 0 0 1.5rem;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;

    button {
      flex: none;
      width: auto;
      min-height: auto;
      padding: 0.7rem 1.5rem;
      border-radius: var(--border-radius-md);
    }
  }
}
</style>
