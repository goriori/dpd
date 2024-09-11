<script setup lang="ts">
import Header from '@/components/globals/header/Header.vue'
import { onMounted, ref } from 'vue'
import GoogleSheetService, { TABLE_FORM } from '@/services/google-sheet'
import { useApplicationStore } from '@/stores/app.store.ts'
import SurprizeForm from '@/components/ui/form/surprize/SurprizeForm.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const applicationStore = useApplicationStore()
const isLoading = ref(false)
const typeClient = ref(route.query.type)
const onSuccessSave = () => {
  applicationStore
    .getModal('send-result')
    ?.setSettings({
      result: true,
      message: 'Данные отправлены, с Вами скоро свяжутся.',
    })
    .onShow()
}
const onErrorSave = () => {
  applicationStore
    .getModal('send-result')
    ?.setSettings({
      result: false,
      message: 'Видимо, произошла техническая ошибка, попробуем ещё раз?',
    })
    .onShow()
}
const sendDataToExcel = async (form: TABLE_FORM) => {
  isLoading.value = true
  switch (typeClient.value) {
    case 'new':
      await GoogleSheetService.sendFormToTableNewUser(form)
        .then(onSuccessSave)
        .finally(() => (isLoading.value = false))
        .catch(onErrorSave)
      break
    case 'old':
      await GoogleSheetService.sendFormToTableOldUser(form)
        .then(onSuccessSave)
        .finally(() => (isLoading.value = false))
        .catch(onErrorSave)
      break
    default:
      break
  }
}
onMounted(() => {})
</script>

<template>
  <div class="page">
    <section class="page-top">
      <Header />
    </section>
    <section class="page-center container">
      <article class="feedback">
        <div class="feedback-title">
          <h2 class="title">
            {{
              typeClient === 'new'
                ? 'Приветствуем новых клиентов!'
                : 'Мы ценим наших клиентов! И благодарим за ваш выбор'
            }}
          </h2>
          <p class="subtitle">Отсканируйте QR-код для получения подарка.</p>
        </div>
        <div class="feedback-qrcode">
          <img v-if="typeClient === 'new'" src="/images/qrcode.png" alt="" />
          <img
            v-if="typeClient === 'old'"
            src="/images/qrcode-old.png"
            alt=""
          />
        </div>
        <div class="feedback-message">
          <p>
            Чтобы получить еще больше возможностей для развития вашего бизнеса,
            позвольте нам с вами связаться.
          </p>
        </div>
        <SurprizeForm :is-loading="isLoading" @on-send="sendDataToExcel" />
      </article>
    </section>
    <section class="page-bottom"></section>
  </div>
</template>

<style scoped lang="scss">
.page {
  &-top {
    padding: 64px 0 32px 0;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &-center {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.feedback {
  width: 100%;
  height: 100%;
  border-radius: 24px;
  padding: 32px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 32px;

  &-title {
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: center;

    .title {
      font-weight: 400;
      font-size: 40px;
    }

    .subtitle {
      font-weight: 300;
      font-size: 32px;
      color: #414042;
    }
  }

  &-qrcode {
    width: 100%;
    height: 100%;
    max-width: 300px;
    max-height: 300px;
    margin: 0 auto;
  }

  &-message {
    text-align: center;
    font-weight: 300;
    font-size: 32px;
    color: #414042;
  }
}
</style>
