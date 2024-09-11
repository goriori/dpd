<script setup lang="ts">
import { ref } from 'vue'

type LProps = {
  columns?: number
  columnWidth?: number
  columnSpace?: number
}

const props = defineProps<LProps>()
const templateColumns = ref(`repeat(${props.columns},${props.columnWidth}px )`)
const columnSpace = ref(`${props.columnSpace}px`)
</script>

<template>
  <div class="list" :style="{ gridTemplateColumns: columns }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.list {
  display: grid;
  grid-template-columns: v-bind(templateColumns);
  gap: v-bind(columnSpace);
}
</style>
