export type TabId = 'science' | 'items' | 'fluids' | 'buildings' | 'pollution'
export type TimeScale = '1m' | '10m' | '1h' | '10h' | '50h' | 'all'
export type ViewMode = 'production' | 'consumption'

export interface ItemData {
  id: string
  label: string
  icon: string
  prodHistory: number[]
  consHistory: number[]
  currentProd: number
  currentCons: number
}

export interface ResearchInfo {
  name: string
  icon: string
  progress: number
}

interface ItemDef {
  id: string
  label: string
  base: number
  variance: number
}

const TAB_DEFS: Record<TabId, ItemDef[]> = {
  science: [
    { id: 'automation-science-pack', label: 'Automation', base: 45, variance: 0.10 },
    { id: 'logistic-science-pack', label: 'Logistic', base: 45, variance: 0.10 },
    { id: 'military-science-pack', label: 'Military', base: 30, variance: 0.15 },
    { id: 'chemical-science-pack', label: 'Chemical', base: 30, variance: 0.12 },
    { id: 'production-science-pack', label: 'Production', base: 15, variance: 0.15 },
    { id: 'utility-science-pack', label: 'Utility', base: 15, variance: 0.15 },
    { id: 'space-science-pack', label: 'Space', base: 8, variance: 0.20 },
  ],
  items: [
    { id: 'iron-plate', label: 'Iron plate', base: 210, variance: 0.05 },
    { id: 'copper-plate', label: 'Copper plate', base: 180, variance: 0.05 },
    { id: 'steel-plate', label: 'Steel plate', base: 45, variance: 0.08 },
    { id: 'iron-gear-wheel', label: 'Iron gear', base: 90, variance: 0.08 },
    { id: 'copper-cable', label: 'Copper cable', base: 300, variance: 0.10 },
    { id: 'iron-stick', label: 'Iron stick', base: 120, variance: 0.10 },
    { id: 'electronic-circuit', label: 'Green circuit', base: 150, variance: 0.06 },
    { id: 'advanced-circuit', label: 'Red circuit', base: 45, variance: 0.10 },
    { id: 'processing-unit', label: 'Processing unit', base: 15, variance: 0.12 },
    { id: 'plastic-bar', label: 'Plastic', base: 60, variance: 0.10 },
    { id: 'sulfur', label: 'Sulfur', base: 20, variance: 0.10 },
    { id: 'stone-brick', label: 'Stone brick', base: 45, variance: 0.10 },
    { id: 'concrete', label: 'Concrete', base: 30, variance: 0.12 },
    { id: 'pipe', label: 'Pipe', base: 30, variance: 0.15 },
    { id: 'transport-belt', label: 'Yellow belt', base: 60, variance: 0.08 },
    { id: 'inserter', label: 'Inserter', base: 45, variance: 0.08 },
  ],
  fluids: [
    { id: 'water', label: 'Water', base: 1200, variance: 0.02 },
    { id: 'steam', label: 'Steam', base: 1200, variance: 0.05 },
    { id: 'crude-oil', label: 'Crude oil', base: 100, variance: 0.10 },
    { id: 'petroleum-gas', label: 'Petroleum gas', base: 400, variance: 0.08 },
    { id: 'light-oil', label: 'Light oil', base: 150, variance: 0.10 },
    { id: 'heavy-oil', label: 'Heavy oil', base: 100, variance: 0.12 },
    { id: 'sulfuric-acid', label: 'Sulfuric acid', base: 100, variance: 0.10 },
    { id: 'lubricant', label: 'Lubricant', base: 45, variance: 0.10 },
  ],
  buildings: [
    { id: 'electric-mining-drill', label: 'E. mining drill', base: 5, variance: 0.10 },
    { id: 'pumpjack', label: 'Pumpjack', base: 2, variance: 0.20 },
    { id: 'oil-refinery', label: 'Oil refinery', base: 1, variance: 0.20 },
    { id: 'chemical-plant', label: 'Chemical plant', base: 3, variance: 0.15 },
    { id: 'electric-furnace', label: 'E. furnace', base: 8, variance: 0.10 },
    { id: 'assembling-machine-3', label: 'Assembler 3', base: 4, variance: 0.15 },
    { id: 'lab', label: 'Lab', base: 5, variance: 0.10 },
    { id: 'beacon', label: 'Beacon', base: 0, variance: 0 },
    { id: 'solar-panel', label: 'Solar panel', base: 4, variance: 0.10 },
    { id: 'accumulator', label: 'Accumulator', base: 3, variance: 0.15 },
  ],
  pollution: [
    { id: 'boiler', label: 'Boiler', base: 24, variance: 0.05 },
    { id: 'stone-furnace', label: 'Stone furnace', base: 0.9, variance: 0.10 },
    { id: 'steel-furnace', label: 'Steel furnace', base: 0.9, variance: 0.10 },
    { id: 'burner-mining-drill', label: 'Burner drill', base: 12, variance: 0.10 },
    { id: 'assembling-machine-1', label: 'Assembler 1', base: 2, variance: 0.15 },
    { id: 'chemical-plant', label: 'Chemical plant', base: 4, variance: 0.10 },
    { id: 'electric-mining-drill', label: 'E. mining drill', base: 10, variance: 0.05 },
    { id: 'pumpjack', label: 'Pumpjack', base: 4, variance: 0.10 },
  ],
}

export const tabIds: TabId[] = ['science', 'items', 'fluids', 'buildings', 'pollution']

export const tabLabels: Record<TabId, string> = {
  science: 'Science',
  items: 'Items',
  fluids: 'Fluids',
  buildings: 'Bldgs',
  pollution: 'Pollution',
}

export const timeScaleLabels: Record<TimeScale, string> = {
  '1m': '1m',
  '10m': '10m',
  '1h': '1h',
  '10h': '10h',
  '50h': '50h',
  'all': 'All',
}

const timeScaleConfig: Record<TimeScale, { varianceMult: number; reversion: number }> = {
  '1m': { varianceMult: 1.0, reversion: 0.15 },
  '10m': { varianceMult: 0.6, reversion: 0.10 },
  '1h': { varianceMult: 0.4, reversion: 0.08 },
  '10h': { varianceMult: 0.25, reversion: 0.05 },
  '50h': { varianceMult: 0.15, reversion: 0.03 },
  'all': { varianceMult: 0.08, reversion: 0.02 },
}

function genData(base: number, variance: number, reversion = 0.08, count = 60): number[] {
  const data: number[] = []
  let prev = base
  for (let i = 0; i < count; i++) {
    const noise = (Math.random() - 0.5) * 2 * Math.max(base, 1) * variance
    prev = Math.max(0, prev + noise + (Math.max(base, 1) - prev) * reversion)
    data.push(prev)
  }
  return data
}

function makeItems(defs: ItemDef[], varianceMult = 1, reversion = 0.08): ItemData[] {
  return defs.map((d) => {
    const prod = genData(d.base, d.variance * varianceMult, reversion)
    const cons = genData(d.base * 0.85, d.variance * varianceMult, reversion)
    return {
      id: d.id,
      label: d.label,
      icon: resolveIconPath(d.id),
      prodHistory: prod,
      consHistory: cons,
      currentProd: prod[prod.length - 1],
      currentCons: cons[cons.length - 1],
    }
  })
}

function resolveIconPath(id: string): string {
  if (id === 'rocket-silo') return '/factorio/icons/research/rocket-silo.png'
  if (id.endsWith('-science-pack')) return `/factorio/icons/science/${id}.png`
  const fluidItems = new Set(['water', 'steam', 'crude-oil', 'petroleum-gas', 'light-oil', 'heavy-oil', 'sulfuric-acid', 'lubricant'])
  if (fluidItems.has(id)) return `/factorio/icons/fluid/${id}.png`
  return `/factorio/icons/item/${id}.png`
}

let tickTimer: ReturnType<typeof setInterval> | null = null

export const useFactorioStore = defineStore('factorio', () => {
  const activeTab = ref<TabId>('science')
  const timeScale = ref<TimeScale>('10m')
  const viewMode = ref<ViewMode>('consumption')
  const showSettings = ref(false)

  const research = ref<ResearchInfo>({
    name: 'Rocket Silo',
    icon: '/factorio/icons/research/rocket-silo.png',
    progress: 0.73,
  })

  const initCfg = timeScaleConfig['10m']
  const tabsData = ref<Record<TabId, ItemData[]>>({
    science: makeItems(TAB_DEFS.science, initCfg.varianceMult, initCfg.reversion),
    items: makeItems(TAB_DEFS.items, initCfg.varianceMult, initCfg.reversion),
    fluids: makeItems(TAB_DEFS.fluids, initCfg.varianceMult, initCfg.reversion),
    buildings: makeItems(TAB_DEFS.buildings, initCfg.varianceMult, initCfg.reversion),
    pollution: makeItems(TAB_DEFS.pollution, initCfg.varianceMult, initCfg.reversion),
  })

  const currentItems = computed(() => {
    const items = tabsData.value[activeTab.value]
    const key = viewMode.value === 'production' ? 'currentProd' : 'currentCons'
    return [...items].sort((a, b) => b[key] - a[key])
  })

  function setTab(tab: TabId) {
    activeTab.value = tab
  }

  function setTimeScale(scale: TimeScale) {
    timeScale.value = scale
    const cfg = timeScaleConfig[scale]
    for (const tabId of tabIds) {
      tabsData.value[tabId] = makeItems(TAB_DEFS[tabId], cfg.varianceMult, cfg.reversion)
    }
    research.value.progress = 0.73
  }

  function toggleViewMode() {
    viewMode.value = viewMode.value === 'production' ? 'consumption' : 'production'
  }

  function setViewMode(mode: ViewMode) {
    viewMode.value = mode
  }

  function tick() {
    for (const [tabId, defs] of Object.entries(TAB_DEFS)) {
      const items = tabsData.value[tabId as TabId]
      for (let i = 0; i < defs.length; i++) {
        const d = defs[i]
        const item = items[i]
        if (d.base === 0 && d.variance === 0) continue

        const pNoise = (Math.random() - 0.5) * 2 * Math.max(d.base, 1) * d.variance * 0.5
        const newProd = Math.max(0, item.currentProd + pNoise + (Math.max(d.base, 1) - item.currentProd) * 0.02)
        item.prodHistory.push(newProd)
        if (item.prodHistory.length > 60) item.prodHistory.shift()
        item.currentProd = newProd

        const cNoise = (Math.random() - 0.5) * 2 * Math.max(d.base, 1) * d.variance * 0.5 * 0.85
        const newCons = Math.max(0, item.currentCons + cNoise + (Math.max(d.base, 1) * 0.85 - item.currentCons) * 0.02)
        item.consHistory.push(newCons)
        if (item.consHistory.length > 60) item.consHistory.shift()
        item.currentCons = newCons
      }
    }

    if (research.value.progress < 1) {
      research.value.progress = Math.min(1, research.value.progress + 0.001)
    }
  }

  if (import.meta.client) {
    tickTimer = setInterval(tick, 2000)
  }

  return {
    activeTab, timeScale, viewMode, showSettings,
    research, currentItems, tabsData,
    setTab, setTimeScale, toggleViewMode, setViewMode,
  }
})
