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
  <List :columns="3" :column-space="32" :column-width="296">
    <template v-for="(card, index) in cardList.slice(0,3)" :key="useId()">
      <AdvantageCard
          :class="[index === 3? 'long': '']"
          :is-special="index === 3"
          :title="card.title"
          :subtitle="card?.subtitle"
          :icon="card.icon"
      />
    </template>
    <AdvantageCard
        class="long"
        is-special
        :html="cardList[3].title"
        :subtitle="cardList[3]?.subtitle"
        :icon="cardList[3].icon"
    />
  </List>
</template>

<style scoped lang="scss">
.long {
  grid-column: 1/4;
}
</style>