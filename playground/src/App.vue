<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>()
</script>

<template>
  <div class="red" style="background: yellow" />
</template>

<style scoped>
.red {
  color: red;
  font-size: 14px;
}
.red .a {
  color: yellow;
}
</style>
