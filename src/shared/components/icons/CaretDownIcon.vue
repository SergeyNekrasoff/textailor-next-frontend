<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    :class="size"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
</template>

<script setup lang="ts">
interface IProps {
  size?: string
}

const props = withDefaults(defineProps<IProps>(), {
  size: 'size-6'
})

const size = props.size
</script>
