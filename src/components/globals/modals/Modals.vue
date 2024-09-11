<script setup lang="ts">
import { useApplicationStore } from '@/stores/app.store.ts'
import { useRouter } from 'vue-router'
import { Modal } from '@/entities/modal/index.ts'

const applicationStore = useApplicationStore()

const router = useRouter()
const onToMain = (modal: Modal) => {
  router.push({ name: 'standby' })
  modal.onHide()
}
</script>

<template>
  <Teleport to="body">
    <section class="modals">
      <template v-for="modal in applicationStore.getModals()" :key="modal.id">
        <component
          :is="modal.getComponent()"
          v-if="modal.getStateVisibility()"
          v-bind="modal.getSettings()"
          @on-close="modal.onHide()"
          @on-to-main="onToMain(modal as Modal)"
        />
      </template>
    </section>
  </Teleport>
</template>

<style scoped></style>
