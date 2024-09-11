<script setup lang="ts">
import Modal from '@/components/ui/modal/Modal.vue'
import Button from '@/components/ui/button/Button.vue'

type MProps = {
  result: boolean
  message: string
}
type MEmits = {
  (eventName: 'onToMain'): void
}
defineProps<MProps>()
const emits = defineEmits<MEmits>()
const onToMain = () => emits('onToMain')
</script>

<template>
  <Modal>
    <template #window>
      <article class="send">
        <div class="send-message">
          <h2 class="message-title">
            {{ result ? 'Успешно' : 'Произошла ошибка' }}
          </h2>
          <p class="message-description">
            {{ message }}
          </p>
        </div>
        <Button background="primary" title="На главную" @on-click="onToMain" />
      </article>
    </template>
  </Modal>
</template>

<style scoped lang="scss">
.send {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 100%;
  max-width: 952px;
  margin: 0 auto;
  padding: 32px;
  border-radius: 24px;
  background: #fff;

  &-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
    line-height: normal;
  }
}

.message {
  &-title {
    font-size: 72px;
    font-weight: 400;
  }

  &-description {
    font-size: 32px;
    font-weight: 300;
  }
}
</style>
