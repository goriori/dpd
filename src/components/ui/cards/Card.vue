<script setup lang="ts">
import {gsap} from "gsap";
import {onMounted} from "vue";

type CProps = {
  iconTopRight?: boolean
  iconBottomRight?: boolean
}
defineProps<CProps>()

onMounted(() => {
  gsap.fromTo(
      '.card',
      {
        top: 0,
        opacity: 0,
        duration: 0.3
      },
      {
        top: 10,
        opacity: 1,
        duration: 0.3
      },
  )
})
</script>

<template>
  <article class="card">
    <div v-show="iconTopRight" class=" top-right"></div>
    <div v-show="iconBottomRight" class=" bottom-right"></div>
    <section class="card-top">
      <slot name="card-top"/>
    </section>
    <section class="card-center">
      <slot name="card-center"/>
    </section>
    <section class="card-bottom">
      <slot name="card-bottom"/>
    </section>
  </article>
</template>

<style scoped lang="scss">
.card {
  position: relative;
  cursor: pointer;
  color: #000;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #F6F6F6;
  border-radius: 16px;
  gap: 10px;
  transition: var(--animation-time) all ease-in-out;

  &-top, &-center, &-bottom {
    z-index: 2;
  }

  &:hover {
    transform: scale(1.1);
  }
}

.top-right {
  position: absolute;
  z-index: 1;
  right: 0;
  top: 0;
  background: url("/images/card/background-top-right.png") no-repeat;
  width: 200px;
  height: 200px;
  border-radius: 16px;
}

.bottom-right {
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 0;
  background: url("/images/card/background-bottom-right.png") no-repeat;
  width: 200px;
  height: 200px;
  border-radius: 16px;

}
</style>
