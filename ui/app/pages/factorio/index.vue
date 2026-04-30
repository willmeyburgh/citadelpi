<template>
  <div class="factorio-page">
    <div class="main-scroll">
      <div v-if="store.activeTab === 'science'" class="research">
        <img :src="store.research.icon" alt="" class="r-icon" draggable="false" />
        <div class="r-info">
          <span class="r-name">{{ store.research.name }}</span>
          <div class="r-bar-bg">
            <div class="r-bar-fill" :style="{ width: (store.research.progress * 100) + '%' }" />
          </div>
        </div>
        <span class="r-pct">{{ Math.round(store.research.progress * 100) }}%</span>
      </div>
      <div class="divider" />
      <ItemRow v-for="item in store.currentItems" :key="item.id" :item="item" />
    </div>
    <TabNav />
    <SettingsDialog v-if="store.showSettings" />
  </div>
</template>

<script setup lang="ts">
import { useFactorioStore } from '~/stores/factorio'
import ItemRow from '~/components/factorio/ItemRow.vue'
import TabNav from '~/components/factorio/TabNav.vue'
import SettingsDialog from '~/components/factorio/SettingsDialog.vue'

const store = useFactorioStore()
</script>

<style scoped>
.factorio-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #181818;
}
.main-scroll {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #333 transparent;
}
.main-scroll::-webkit-scrollbar {
  width: 4px;
}
.main-scroll::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 2px;
}
.research {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px 4px 4px;
  height: 32px;
}
.r-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  image-rendering: pixelated;
}
.r-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}
.r-name {
  font-size: 11px;
  color: #ccc;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.r-bar-bg {
  height: 4px;
  background: #2a2a2a;
  border-radius: 2px;
  overflow: hidden;
}
.r-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #06b6d4, #0891b2);
  border-radius: 2px;
  transition: width 1s ease;
}
.r-pct {
  font-size: 10px;
  color: #666;
  font-family: 'JetBrains Mono', monospace;
  width: 32px;
  text-align: right;
  flex-shrink: 0;
}
.divider {
  height: 1px;
  background: #2a2a2a;
  margin: 0 4px;
}
</style>
