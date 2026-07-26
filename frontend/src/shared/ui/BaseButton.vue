<script setup lang="ts">
defineOptions({ name: 'BaseButton' });

type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'icon'
  | 'ghost'
  | 'toast';

type ButtonSize = 'sm' | 'md' | 'lg';

withDefaults(
  defineProps<{
    variant?: ButtonVariants;
    size?: ButtonSize;
    isIcon?: boolean;
  }>(),
  {
    variant: 'primary',
    size: 'md',
    isIcon: false,
  },
);
</script>

<template>
  <button
    :class="[
      'base-btn',
      isIcon || variant === 'icon'
        ? 'base-btn--icon'
        : [`base-btn--${variant}`, `base-btn--${size}`],
    ]"
  >
    <slot />
  </button>
</template>

<style lang="scss">
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  font-size: var(--font-size-sm);
  padding: 0.6rem 1rem;
  border-radius: var(--border-radius-md);
  border: 0.1rem solid transparent;
  cursor: pointer;
  height: 3.5rem;

  &--primary {
    background-color: var(--color-primary);
    color: var(--color-white);

    &:hover {
      border-color: var(--color-dark);
    }
  }

  &--secondary {
    background-color: var(--color-secondary);
    color: var(--color-muted-purple);

    &:hover {
      border-color: var(--color-primary);
    }
  }

  &--danger {
    background-color: var(--color-grey);
    color: var(--color-white);
  }

  &--icon {
    padding: 0;
    width: 2rem;
    height: 2rem;
    background-color: var(--color-white);
    border: none;
    color: var(--color-muted-dark);
  }

  &--ghost {
    background-color: var(--color-white);
    color: var(--color-primary);
    font-weight: var(--font-weight-medium);

    &:hover {
      border-color: var(--color-primary);
    }
  }

  &--toast {
    background-color: var(--color-toast);
    color: var(--color-toast-text);
    font-weight: var(--font-weight-medium);
    border: 0.1rem solid rgba(0, 0, 0, 0.08);

    &:hover {
      border-color: var(--color-primary);
    }
  }

  &--md {
    height: 3.5rem;
    padding: 0 2rem;
  }

  &--sm {
    height: 2.8rem;
    padding: 0 1rem;
  }

  &--lg {
    height: 4.2rem;
    padding: 0 2.5rem;
  }
}
</style>
