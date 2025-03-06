<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    :class="size"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
  </svg>
</template>

<script setup lang="ts">
interface IProps {
  size: string
}

const props = withDefaults(defineProps<IProps>(), {
  size: 'size-6'
})

const size = props.size
</script>
