<script setup lang="ts">
import {gsap} from "gsap";
import {onMounted} from "vue";

onMounted(() => {
  gsap.timeline().fromTo('.screen-top', {
    scale: 0,
    duration: 0.3
  }, {
    scale: 1,
    duration: 0.3
  }).fromTo('.screen-center', {
    scale: 0,
    duration: 0.3
  }, {
    scale: 1,
    duration: 0.3
  }).fromTo('.screen-bottom', {
    scale: 0,
    duration: 0.3
  }, {
    scale: 1,
    duration: 0.3
  })
})
</script>

<template>
  <article class="screen">
    <section class="screen-top">
      <slot name="screen-info"/>
    </section>
    <section class="screen-center">
      <slot name="screen-cards"/>
    </section>
    <section class="screen-bottom">
      <slot name="screen-preview"/>
    </section>
  </article>
</template>

<style scoped lang="scss">
.screen {
  display: flex;
  flex-direction: column;

  &-top {
    margin-bottom: 32px;
  }

  &-center {
    flex: 0 1 763px
  }

  &-bottom {
    max-height: 200px;
  }
}
</style>