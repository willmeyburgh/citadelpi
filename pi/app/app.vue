<script setup lang="ts">
const { connect } = useTabController()
onMounted(() => connect())
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
