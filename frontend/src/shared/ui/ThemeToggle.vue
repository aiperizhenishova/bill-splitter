<script setup lang="ts">
import BaseButton from '@/shared/ui/BaseButton.vue';
import { IconMoonFilled, IconSunFilled } from '@tabler/icons-vue';
import { useTheme } from '@/features/toggle-theme';

defineOptions({ name: 'ThemeToggle' });
const { toggleTheme, isDark } = useTheme();
</script>

<template>
  <BaseButton variant="icon" class="theme-toggle" @click="toggleTheme()">
    <IconSunFilled v-if="isDark" />
    <IconMoonFilled v-else />
  </BaseButton>
</template>

<style lang="scss">
.theme-toggle {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  color: var(--color-muted-purple);
  border: 0.1rem solid var(--color-light-purple-gray);
  border-radius: var(--border-radius-md);
}
</style>
