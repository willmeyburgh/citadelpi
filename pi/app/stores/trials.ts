export const activityIds = ['meditation', 'reading', 'failure', 'exercise'] as const
export type ActivityId = typeof activityIds[number]

export const activityLabels: Record<ActivityId, string> = {
  meditation: 'Meditation',
  reading: 'Reading',
  failure: 'Failure',
  exercise: 'Exercise',
}

export const colorSteps = ['red', 'orange', 'yellow', 'green'] as const
export type ColorStep = typeof colorSteps[number]

export const colorValues: Record<ColorStep, string> = {
  red: '#ef4444',
  orange: '#f97316',
  yellow: '#eab308',
  green: '#22c55e',
}

function getTodayUTC(): string {
  const d = new Date()
  const utc = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
  return utc.toISOString().slice(0, 10)
}

export const useTrialsStore = defineStore('trials', () => {
  const colors = ref<Record<ActivityId, ColorStep>>({
    meditation: 'red',
    reading: 'red',
    failure: 'red',
    exercise: 'red',
  })
  const lastResetDate = ref('')

  function checkAndReset() {
    const today = getTodayUTC()
    if (lastResetDate.value !== today) {
      for (const id of activityIds) {
        colors.value[id] = 'red'
      }
      lastResetDate.value = today
    }
  }

  function setColor(activityId: ActivityId, color: ColorStep) {
    colors.value[activityId] = color
  }

  checkAndReset()

  return { colors, lastResetDate, checkAndReset, setColor }
})
