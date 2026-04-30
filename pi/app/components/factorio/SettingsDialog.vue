<template>
  <Teleport to="body">
    <div class="overlay" @click.self="store.showSettings = false">
      <div class="dialog">
        <div class="header">
          <span class="title">Settings</span>
          <button class="close" @click="store.showSettings = false">
            <X size="20" />
          </button>
        </div>

        <div class="section">
          <div class="section-title">Time scale</div>
          <div class="btn-row">
            <button
              v-for="s in scales"
              :key="s"
              class="scale-btn"
              :class="{ active: store.timeScale === s }"
              @click="store.setTimeScale(s)"
            >
              {{ s }}
            </button>
          </div>
        </div>

        <div class="section">
          <div class="section-title">View</div>
          <div class="btn-row">
            <button
              class="mode-btn"
              :class="{ active: store.viewMode === 'production' }"
              @click="store.setViewMode('production')"
            >
              Production
            </button>
            <button
              class="mode-btn"
              :class="{ active: store.viewMode === 'consumption' }"
              @click="store.setViewMode('consumption')"
            >
              Consumption
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { useFactorioStore, timeScaleLabels, type TimeScale, type ViewMode } from '~/stores/factorio'

const store = useFactorioStore()

const scales = Object.keys(timeScaleLabels) as TimeScale[]
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.dialog {
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 14px;
  padding: 20px;
  width: 340px;
  max-width: 90vw;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.title {
  font-size: 16px;
  color: #ccc;
  font-weight: 600;
}
.close {
  all: unset;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
}
.close:hover {
  color: #ccc;
}
.section {
  margin-bottom: 18px;
}
.section-title {
  font-size: 11px;
  color: #666;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.btn-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.scale-btn, .mode-btn {
  all: unset;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #888;
  background: #2a2a2a;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.scale-btn:hover, .mode-btn:hover {
  background: #333;
  color: #ccc;
}
.scale-btn.active, .mode-btn.active {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
</style>
