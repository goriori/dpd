<script setup lang="ts">

import {useId} from "vue";
import List from "@/components/ui/list/List.vue";
import AdvantageCard from "@/components/ui/cards/advantage-card/AdvantageCard.vue";
import {INFO_CARD} from "@/pages/Standby.vue";

type DProps = {
  cardList: INFO_CARD[]
}

defineProps<DProps>()
console.log(useId())
</script>

<template>
  <List class="business-list">
    <template v-for="card in cardList" :key="useId()">
      <AdvantageCard
          :title="card.title"
          :subtitle="card.subtitle"
          :icon="card.icon"
      />
    </template>
  </List>
</template>

<style scoped lang="scss">
.business-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 952px;
  gap: 32px;
}
</style>