<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import Header from '@/components/globals/header/Header.vue'
import Footer from '@/components/globals/footer/Footer.vue'
import GameScreen from '@/components/ui/screen/game-screen/GameScreen.vue'

const router = useRouter()
const infoScreens = ref()
const buttonTitle = ref('Начать')
const onLoadInfoScreens = async () => {
  const response = await fetch('/info-screens.json')
  return response.json()
}
const startGame = () => {
  router.push('/game')
}
onMounted(async () => {
  infoScreens.value = await onLoadInfoScreens()
})
</script>

<template>
  <div class="page" @click="startGame">
    <section class="page-top">
      <Header />
    </section>
    <section class="page-center container">
      <GameScreen
        v-if="infoScreens"
        :title="infoScreens[4].title"
        :preview="infoScreens[4].preview"
      />
    </section>
    <section class="page-bottom">
      <Footer :button-title="buttonTitle" @on-next="startGame" />
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
