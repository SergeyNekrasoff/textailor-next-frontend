<template>
  <div class="spinner-loader" :class="size">
    <div class="spinner-loader__circle" />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'lg' | 'md' | 'sm' | 'page'
  }>(),
  {
    size: 'page'
  }
)
</script>

<style lang="scss" scoped>
.spinner-loader {
  --size: 140px;
  --step: 40px;
  --border: 15px;

  display: flex;
  position: relative;
  width: var(--size);
  height: var(--size);
  margin: 0 auto;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;

    border-radius: 100%;
    border-style: solid;
    border-width: var(--border);
    border-color: var(--vt-c-gray-dark-1) transparent var(--vt-c-gray-dark-2) transparent;

    animation-name: spinny;
    animation-duration: 0.6s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }

  &::after {
    width: var(--size);
    height: var(--size);
    animation-direction: alternate-reverse;
  }

  &::before {
    width: calc(var(--size) - var(--step));
    height: calc(var(--size) - var(--step));
  }

  &__circle {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: calc(var(--size) - (var(--step) * 2));
    height: calc(var(--size) - (var(--step) * 2));
    transform: translate3d(-50%, -50%, 0);
    border-radius: 100%;
    background-color: var(--vt-c-gray-dark-4);
  }

  &.page {
    margin: 100px auto;
  }

  &.lg {
    --size: 100px;
    --step: 30px;
    --border: 10px;
  }

  &.md {
    --size: 50px;
    --step: 15px;
    --border: 5px;
  }

  &.sm {
    --size: 20px;
    --step: 10px;
    --border: 2px;
  }
}
@keyframes spinny {
  0% {
    transform-origin: 50%;
    transform: translate3d(-50%, -50%, 0) rotateZ(0deg);
  }
  100% {
    transform: translate3d(-50%, -50%, 0) rotateZ(360deg);
  }
}
</style>
