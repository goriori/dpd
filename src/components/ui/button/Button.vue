<script setup lang="ts">
import CircleSpinner from '@/components/ui/spiners/CircleSpinner.vue'

type BProps = {
  title?: string
  outline?: boolean
  isLoading?: boolean
  background?: 'primary' | 'secondary' | 'thridy' | 'none'
}
type BEmits = {
  (eventName: 'onClick'): void
}
defineProps<BProps>()
const emits = defineEmits<BEmits>()
const onClick = () => emits('onClick')
</script>

<template>
  <button :class="['btn', background, { outline }]" @click="onClick" v-ripple>
    <p v-if="!isLoading">{{ title }}</p>
    <CircleSpinner v-else class="loader" />
  </button>
</template>

<style scoped>
.loader {
  max-width: 60px;
  max-height: 60px;
}

.btn {
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: none;
  color: #ffffff;
  font-size: 40px;
  padding: 24px 0;
  cursor: pointer;
  background-color: transparent;
  transition: var(--animation-time) all ease-in-out;

  &:active {
    transition: var(--animation-time) all ease-in-out;
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.25;
  }
}

.outline {
  color: #000;
  background: #ffffff !important;
  border: 4px solid transparent;
}

.primary {
  border-color: var(--primary-color);
  background-color: var(--primary-color);
}

.secondary {
  background-color: var(--secondary-color);
}

.thridy {
  background-color: var(--thrid-color);
}
</style>
