<script setup lang="ts">

import Screen from "@/components/ui/screen/Screen.vue";

type SProps = {
  title: string;
  preview: string
}

defineProps<SProps>()
const message = `
Доставлять с DPD легко!
 Сыграйте в мини-игру
и убедитесь в этом сами
 прямо сейчас
`
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
      <pre class="black">
        {{message}}
      </pre>
    </template>
  </Screen>
</template>

<style scoped lang="scss">
::v-deep(.screen-center) {
  flex: 0 1 700px;
}

pre {
  font-family: Pluto;
  font-size: 64px;
  color: #fff;
  font-weight: normal;
  text-align: center;
  line-height: normal;
}

p {
  text-align: center;
  font-size: 72px;
  color: #fff;
}

img {
  position: absolute;
  height: 900px;
  left: 50%;
  transform: translate(-50%, -20%);
  object-fit: cover;
}

</style>