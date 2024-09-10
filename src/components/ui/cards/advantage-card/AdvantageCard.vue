<script setup lang="ts">

import Card from "@/components/ui/cards/Card.vue";

type CProps = {
  title?: string
  subtitle?: string
  icon: string
  isSpecial?: boolean
  html?: string
}
defineProps<CProps>()
</script>

<template>
  <Card class="advantage-card">
    <template #card-center>
      <div :class="['content', {long:isSpecial}]">
        <div class="icon">
          <div :class="['icon-background', {'background-big':isSpecial}]"></div>
          <img :src="icon" alt="">
        </div>
        <div>
          <p class="title title-big" v-html="html"/>
          <p class="title">{{ title }}</p>
          <p class="subtitle">{{ subtitle }}</p>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">

.icon {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &-background {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    max-width: 128px;
    transform: translate(-50%, 0);
    z-index: 1;
    background: url("/images/screens/services/backgorund-icon.png") no-repeat;
  }

  img {
    z-index: 2;
    object-fit: cover;

  }
}

.background-big {
  max-width: 250px;
  background: url("/images/screens/services/backgorund-icon.png") no-repeat;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

p {
  color: #414042;
  text-align: center;
  max-width: 232px;
  line-height: normal;
  font-weight: 400;
}


.title {
  font-size: 20px;
  height: 50px;

  &-big {
    font-size: 40px;
    max-width: none;
    text-align: left;
    height: auto;
    font-weight: 400;
  }
}

.subtitle {
  font-weight: 300;
}

.long {
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
}
</style>