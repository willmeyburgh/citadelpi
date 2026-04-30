<template>
  <div class="item-row">
    <img :src="item.icon" :alt="item.label" class="icon" draggable="false" />
    <Sparkline
      :data="currentHistory"
      :color="sparkColor"
      height="22"
    />
    <span class="value">{{ formattedValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ItemData } from '~/stores/factorio'
import { useFactorioStore } from '~/stores/factorio'
import Sparkline from '~/components/factorio/Sparkline.vue'

const props = defineProps<{
  item: ItemData
}>()

const store = useFactorioStore()

const currentHistory = computed(() =>
  store.viewMode === 'production' ? props.item.prodHistory : props.item.consHistory
)

const currentValue = computed(() =>
  store.viewMode === 'production' ? props.item.currentProd : props.item.currentCons
)

const sparkColor = computed(() =>
  store.viewMode === 'production' ? '#f97316' : '#06b6d4'
)

function format(v: number): string {
  if (v >= 1000000) return (v / 1000000).toFixed(1) + 'M'
  if (v >= 1000) return (v / 1000).toFixed(1) + 'k'
  if (v >= 100) return Math.round(v).toString()
  if (v >= 10) return v.toFixed(1)
  return v.toFixed(2)
}

const formattedValue = computed(() => format(currentValue.value) + '/min')
</script>

<style scoped>
.item-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px;
  height: 28px;
  border-bottom: 1px solid #222;
}
.icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  image-rendering: pixelated;
}
.value {
  width: 70px;
  text-align: right;
  font-size: 11px;
  color: #999;
  font-family: 'JetBrains Mono', monospace;
  flex-shrink: 0;
}
</style>
