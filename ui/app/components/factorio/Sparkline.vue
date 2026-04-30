<template>
  <svg
    width="100%"
    :viewBox="`0 0 ${svgWidth} ${height}`"
    preserveAspectRatio="none"
    class="sparkline"
  >
    <defs>
      <linearGradient :id="gradId" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" :stop-color="color" stop-opacity="0.3" />
        <stop offset="100%" :stop-color="color" stop-opacity="0.02" />
      </linearGradient>
    </defs>
    <path
      :d="areaPath"
      :fill="`url(#${gradId})`"
    />
    <polyline
      :points="linePoints"
      :stroke="color"
      stroke-width="1.5"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  data: number[]
  color?: string
  height?: number
}>(), {
  color: '#06b6d4',
  height: 22,
})

const svgWidth = 300

const uid = `${Math.random().toString(36).slice(2, 8)}-${Date.now()}`
const gradId = `${uid}-grad`

function scale(v: number, min: number, range: number): number {
  return ((v - min) / range) * (props.height - 2) + 1
}

const linePoints = computed(() => {
  const d = props.data
  const n = d.length
  if (n < 2) return ''
  const min = Math.min(...d)
  const max = Math.max(...d)
  const range = max - min || 1
  const stepX = svgWidth / (n - 1)
  return d
    .map((v, i) => {
      const x = i * stepX
      const y = props.height - scale(v, min, range)
      return `${x},${y}`
    })
    .join(' ')
})

const areaPath = computed(() => {
  const d = props.data
  const n = d.length
  if (n < 2) return ''
  const min = Math.min(...d)
  const max = Math.max(...d)
  const range = max - min || 1
  const stepX = svgWidth / (n - 1)
  let path = `M0,${props.height}`
  for (let i = 0; i < n; i++) {
    const x = i * stepX
    const y = props.height - scale(d[i], min, range)
    path += ` L${x},${y}`
  }
  path += ` L${(n - 1) * stepX},${props.height} Z`
  return path
})
</script>

<style scoped>
.sparkline {
  display: block;
  flex: 1;
  min-width: 0;
}
</style>
