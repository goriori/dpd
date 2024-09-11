<script setup lang="ts">
import Card from '@/components/ui/cards/Card.vue'

type CProps = {
  title: string
  icon: string
  iconTopRight?: boolean
  iconBottomRight?: boolean
}
defineProps<CProps>()
</script>

<template>
  <Card
    :icon-bottom-right="iconBottomRight"
    :icon-top-right="iconTopRight"
    class="info-card"
  >
    <template #card-center>
      <div class="content">
        <p>{{ title }}</p>
        <img :src="icon" alt="" />
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.info-card {
  max-height: 240px;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

p {
  max-width: 217px;
  line-height: normal;
  font-size: 20px;
  font-weight: 400;
}
</style>
