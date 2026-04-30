<template>
  <div class="tab-nav">
    <div class="tabs" ref="tabsRef">
      <button
        v-for="id in tabIds"
        :key="id"
        class="tab"
        :class="{ active: store.activeTab === id }"
        @click="store.setTab(id)"
      >
        {{ tabLabels[id] }}
      </button>
    </div>
    <button class="burger" @click="store.showSettings = true">
      <Menu size="24" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Menu } from 'lucide-vue-next'
import { useFactorioStore, tabIds, tabLabels } from '~/stores/factorio'

const store = useFactorioStore()
</script>

<style scoped>
.tab-nav {
  height: 72px;
  display: flex;
  align-items: center;
  background: #141414;
}
.tabs {
  flex: 1;
  display: flex;
  align-items: center;
  overflow-x: auto;
  scrollbar-width: none;
  gap: 0;
  min-width: 0;
}
.tabs::-webkit-scrollbar {
  display: none;
}
.tab {
  all: unset;
  white-space: nowrap;
  padding: 0 18px;
  margin: 0 3px;
  height: 56px;
  font-size: 18px;
  font-weight: 600;
  color: #555;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 14px;
  transition: color 0.15s, background 0.15s;
  flex-shrink: 0;
}
.tab:hover {
  color: #999;
  background: #1e1e1e;
}
.tab.active {
  color: #fff;
  background: #2a2a2a;
}
.burger {
  all: unset;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #555;
  flex-shrink: 0;
  border-radius: 14px;
  margin-left: 4px;
}
.burger:hover {
  color: #ccc;
  background: #2a2a2a;
}
</style>
