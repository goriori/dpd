<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import Header from "@/components/globals/header/Header.vue";
import InfoScreen from "@/components/ui/screen/info-screen/InfoScreen.vue";
import BusinessScreen from "@/components/ui/screen/business-screen/BusinessScreen.vue";

export type INFO_CARD = {
  id: number
  title: string
  subtitle: string
  iconTopRight: boolean
  iconBottomRight: boolean
  icon: string
}
export type INFO_SCREEN = {
  "id": number,
  "title": string,
  "preview": string,
  "typeCard": string,
  oferta?: string
  "cards": INFO_CARD[]
}

const router = useRouter()
const timerId = ref<number | undefined>(undefined)
const infoScreens = ref<INFO_SCREEN[] | null>(null)
const targetInfoScreen = ref(0)
const targetEntityScreen = ref('info')


const onLoadInfoScreens = async () => {
  const response = await fetch('/info-screens.json')
  return response.json()
}

const startSlides = () => {
  const TIME_CHANGE = window.TIME_STANDBY_SWITCH_SECOND * 1000
  const timerId = setInterval(() => {
    if (targetInfoScreen.value === 2) targetEntityScreen.value = 'business'
    if (targetInfoScreen.value === 3) {
      targetEntityScreen.value = 'info'
      targetInfoScreen.value = 0
    } else targetInfoScreen.value += 1
  }, TIME_CHANGE)
  return timerId
}

const clickPage = () => {
  clearInterval(timerId.value)
  router.push({name: 'main'})
}
onMounted(async () => {
  infoScreens.value = await onLoadInfoScreens()
  timerId.value = startSlides()
})
</script>

<template>
  <div class="page " @click="clickPage">
    <section class="page-top ">
      <Header/>
    </section>
    <section class="page-center container">
      <InfoScreen
          v-if="infoScreens && targetEntityScreen === 'info'"
          :title="infoScreens[targetInfoScreen].title"
          :oferta="infoScreens[targetInfoScreen].oferta"
          :typeCard="infoScreens[targetInfoScreen].typeCard"
          :card-list="infoScreens[targetInfoScreen].cards"
          :preview="infoScreens[targetInfoScreen].preview"
      />
      <BusinessScreen
          v-if="infoScreens && targetEntityScreen === 'business'"
          :title="infoScreens[targetInfoScreen].title"
          :card-list="infoScreens[targetInfoScreen].cards"
          :preview="infoScreens[targetInfoScreen].preview"
      />
    </section>
    <section class="page-bottom">
    </section>
  </div>
</template>

<style scoped lang="scss">
.page {
  background: var(--primary-color);

  &-top {
    padding: 64px 0;
  }

  &-center {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.btn {
  max-width: 200px;
}
</style>
