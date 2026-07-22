<script setup lang="ts">
import { ref, computed } from 'vue';
import { IconEye, IconEyeOff } from '@tabler/icons-vue';

defineOptions({ name: 'BaseInput' });

const props = withDefaults(
  defineProps<{
    modelValue: string | number | boolean;
    type?: 'text' | 'password' | 'email' | 'number' | 'checkbox';
    placeholder?: string;
    required?: boolean;
  }>(),
  {
    type: 'text',
    required: false,
  },
);

defineEmits<{ 'update:modelValue': [value: string] }>();

const showPassword = ref(false);
const isPassword = computed(() => props.type === 'password');
const inputType = computed(() =>
  isPassword.value ? (showPassword.value ? 'text' : 'password') : props.type,
);
</script>

<template>
  <div
    class="base-input"
    :class="{
      'base-input--password': isPassword,
    }"
  >
    <input
      :value="modelValue"
      :type="inputType"
      :placeholder="placeholder"
      :required="required"
      class="base-input__field"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <button
      v-if="isPassword"
      type="button"
      class="base-input__toggle"
      @click="showPassword = !showPassword"
    >
      <IconEye v-if="showPassword" />
      <IconEyeOff v-else />
    </button>
  </div>
</template>

<style lang="scss">
.base-input {
  position: relative;
  width: 100%;
  height: 3.5rem;

  &__field {
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    font-size: var(--font-size-sm);
    font-family: inherit;
    border-radius: var(--border-radius-md);
    border: 0.1rem solid var(--color-secondary);
    color: var(--color-dark);
    background-color: var(--color-white);

    &::placeholder {
      color: var(--color-muted-purple);
    }

    &:hover,
    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0px 1000px var(--color-white) inset;
      -webkit-text-fill-color: var(--color-dark);
    }
  }

  &--password &__field {
    padding-right: 3rem;
  }

  &__toggle {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    color: var(--color-muted-purple);
  }
}
</style>
