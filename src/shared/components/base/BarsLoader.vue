<template>
  <span class="bars-loader"></span>
</template>

<style lang="scss" scoped>
.bars-loader {
  display: inline-block;
  margin: 0 auto;
  width: 40px;
  height: 0;
  border-radius: 50%;
  color: var(--vt-c-text-dark-code);
  box-shadow:
    -9px 0 0 4px,
    0px 0 0 1px,
    9px 0 0 0;
  transform: translateX(0);
  animation: barsLoader 0.5s infinite alternate linear;
}

@keyframes barsLoader {
  50% {
    box-shadow:
      -9px 0 0 1px,
      0px 0 0 2px,
      9px 0 0 1px;
  }
  100% {
    box-shadow:
      -9px 0 0 0,
      0px 0 0 1px,
      9px 0 0 2px;
  }
}
</style>
