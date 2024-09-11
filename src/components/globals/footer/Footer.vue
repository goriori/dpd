<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { computed } from 'vue'

type FProps = {
  buttonTitle: string
}
type FEmits = {
  (eventName: 'onNext'): void
}
const props = defineProps<FProps>()
const emits = defineEmits<FEmits>()
const title = computed(() => props.buttonTitle)
const onNext = () => emits('onNext')
</script>

<template>
  <footer>
    <Button
      outline
      background="primary"
      :title="title"
      class="btn-next"
      @on-click="onNext"
    />
  </footer>
</template>

<style scoped lang="scss">
footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
  &-next {
    max-width: 460px;
  }
}
</style>
