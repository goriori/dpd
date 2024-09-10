<script setup lang="ts">

import LogoIcon from "@/components/ui/icons/LogoIcon.vue";
import {useRouter} from "vue-router";

const router = useRouter()

const toMain = () => router.push('/')
</script>

<template>
  <header>
    <LogoIcon @click="toMain"/>
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>