<template>
  <div class="edit-page">
    <button class="activity-btn" :style="{ background: colorValues[store.colors[activityId]] }">
      <span class="label">{{ activityLabels[activityId] }}</span>
    </button>
    <div class="colors">
      <button
        v-for="step in colorSteps"
        :key="step"
        class="color-btn"
        :style="{ background: colorValues[step] }"
        @click="pick(step)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTrialsStore, activityLabels, colorValues, colorSteps, type ActivityId } from '~/stores/trials'

const route = useRoute()
const store = useTrialsStore()

const activityId = route.params.id as ActivityId

function pick(step: typeof colorSteps[number]) {
  if (activityIds.includes(activityId)) {
    store.setColor(activityId, step)
  }
  navigateTo('/trials')
}
</script>

<style scoped>
.edit-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 6px;
  gap: 6px;
}
.activity-btn {
  all: unset;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  cursor: pointer;
  font-family: inherit;
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: filter 0.15s, transform 0.1s;
}
.activity-btn:hover {
  filter: brightness(1.15);
}
.activity-btn:active {
  transform: scale(0.96);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25);
}
.label {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}
.colors {
  display: flex;
  gap: 6px;
}
.color-btn {
  all: unset;
  flex: 1;
  aspect-ratio: 1;
  border-radius: 14px;
  cursor: pointer;
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: filter 0.15s, transform 0.1s;
}
.color-btn:hover {
  filter: brightness(1.15);
}
.color-btn:active {
  transform: scale(0.96);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25);
}
</style>
