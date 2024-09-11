<script setup lang="ts">
import Screen from '@/components/ui/screen/Screen.vue'
import DeliveryList from '@/components/ui/list/delivery-list/DeliveryList.vue'
import AdvantageList from '@/components/ui/list/advantage-list/AdvantageList.vue'

type SProps = {
  title: string
  cardList: object[]
  preview: string
  typeCard: 'info' | 'advantage'
  oferta?: string
}

defineProps<SProps>()
</script>

<template>
  <Screen>
    <template #screen-info>
      <pre>{{ title }}</pre>
    </template>
    <template #screen-cards>
      <DeliveryList :card-list="cardList" v-if="typeCard === 'info'" />
      <AdvantageList
        :card-list="cardList"
        v-else-if="typeCard === 'advantage'"
      />
    </template>
    <template #screen-preview>
      <img :src="preview" alt="image" class="preview" />
      <p v-if="oferta" class="oferta">{{ oferta }}</p>
    </template>
  </Screen>
</template>

<style scoped lang="scss">
pre {
  font-family: Pluto;
  font-size: 64px;
  color: #fff;
  font-weight: normal;
  text-align: center;
}

img {
  display: flex;
  margin: 0 auto;
  object-fit: cover;
}

.oferta {
  font-weight: 300;
  font-size: 12px;
  color: #fff;
}
</style>
