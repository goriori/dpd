<script setup lang="ts">

import Screen from "@/components/ui/screen/Screen.vue";
import BusinessList from "@/components/ui/list/business-list/BusinessList.vue";

type SProps = {
  title: string;
  cardList: object[]
  preview: string
}

defineProps<SProps>()

</script>

<template>
  <Screen>
    <template #screen-info>
      <pre>{{ title }}</pre>
    </template>
    <template #screen-cards>
      <img :src="preview" alt="image" class="preview">
    </template>
    <template #screen-preview>
      <BusinessList :card-list="cardList"/>
    </template>
  </Screen>
</template>

<style scoped lang="scss">
::v-deep(.screen-center) {
  flex: 0 1 600px;
}
pre {
  font-family: Pluto;
  font-size: 64px;
  color: #fff;
  font-weight: normal;
  text-align: center;
}

img {
  position: absolute;
  height: 900px;
  left: 50%;
  transform: translate(-50%,-20%);
  object-fit: cover;
}

</style>