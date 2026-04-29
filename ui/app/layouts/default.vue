<template>
  <div class="wrapper">
    <div class="screen">
      <slot />
    </div>
  </div>
</template>

<style>
html, body {
  margin: 0;
  background: #0f0f0f !important;
}
</style>

<style scoped>
.wrapper {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0f0f;
}

.screen {
  width: 480px;
  height: 320px;
  overflow: hidden;
  position: relative;
  background: #181818;
}
</style>
