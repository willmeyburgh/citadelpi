<template>
  <div class="grid">
    <button
      v-for="id in activityIds"
      :key="id"
      class="btn"
      :style="{ background: colorValues[store.colors[id]] }"
      @click="navigateTo(`/trials/edit/${id}`)"
    >
      <span class="label">{{ activityLabels[id] }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTrialsStore, activityIds, activityLabels, colorValues } from '~/stores/trials'

const store = useTrialsStore()
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 6px;
  height: 100%;
  padding: 6px;
}
.btn {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  cursor: pointer;
  font-family: inherit;
  transition: filter 0.15s, transform 0.1s;
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.3);
}
.btn:hover {
  filter: brightness(1.15);
}
.btn:active {
  transform: scale(0.96);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25);
}
.label {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}
</style>
