<script setup lang="ts">
import { useId } from 'vue'
import { INFO_CARD } from '@/pages/Standby.vue'
import List from '@/components/ui/list/List.vue'
import InfoCard from '@/components/ui/cards/info-card/InfoCard.vue'

type DProps = {
  cardList: INFO_CARD[]
}

defineProps<DProps>()
console.log(useId())
</script>

<template>
  <List :columns="2" :column-width="460" :column-space="32">
    <template v-for="card in cardList" :key="useId()">
      <InfoCard
        :title="card.title"
        :icon="card.icon"
        :icon-top-right="card?.iconTopRight"
        :icon-bottom-right="card?.iconBottomRight"
      />
    </template>
  </List>
</template>

<style scoped lang="scss"></style>
