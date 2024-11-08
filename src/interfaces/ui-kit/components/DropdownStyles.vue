<template>
  <section class="pr-6">
    <h2 class="mb-8">Selection</h2>

    <div class="column gap-s max-w-field">
      <BaseDropdown align-content="right">
        <template #toggle="{ toggle }">
          <BaseButton @click="toggle" class="bg-divider_light_1">
            <template v-slot:icon>
              {{ selected ?? 'Sort' }}
              <ChevronDownIcon class="h-4 w-4 ml-2 text-text_dark_2" />
            </template>
          </BaseButton>
        </template>
        <div v-if="items?.length">
          <BaseDropdownItem
            v-for="(item, index) in items"
            :key="index"
            @click.prevent="onChange(item)"
          >
            <span class="text-sm">{{ item }}</span>
          </BaseDropdownItem>
        </div>
      </BaseDropdown>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import BaseButton from '../../../shared/components/base/BaseButton.vue'
import BaseDropdown from '../../../shared/components/base/BaseDropdown.vue'
import BaseDropdownItem from '../../../shared/components/base/BaseDropdownItem.vue'
import { ChevronDownIcon } from '../../../shared/components/icons'

interface IBaseDropdownItem {
  items?: object[] | string[]
}

defineProps<IBaseDropdownItem>()

const selected: Ref<string | object | undefined> = ref()

const onChange = item => (selected.value = item)
</script>

<style lang="scss" scoped></style>
