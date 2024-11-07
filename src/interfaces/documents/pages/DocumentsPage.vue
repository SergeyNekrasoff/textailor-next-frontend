<template>
  <div class="mx-auto w-[90%] max-w-[1280px] flex flex-col justify-center px-6 py-8 duration-500">
    Documents
    <!-- <div class="flex w-full flex-1 flex-col max-w-screen-xl mx-auto">
      <div class="flex items-center justify-between mb-20">
        <div class="text-2xl">My Projects</div>
        <div class="flex items-center justify-end">
          <BaseButton
            class="mr-2 flex items-center justify-center border border-gray_dark_2"
            @click="createFolder"
          >
            <template v-slot:icon>
              <FolderPlusIcon class="h-5 w-5 mr-2 text-text_dark_2" />
            </template>

            New Folder
          </BaseButton>
          <BaseButton
            class="mr-2 flex items-center justify-center border border-gray_dark_2 bg-text_dark_4"
            @click="createProject"
          >
            <template v-slot:icon>
              <DocumentPlusIcon class="h-5 w-5 mr-2 text-text_dark_2" />
            </template>

            New Project
          </BaseButton>
        </div>
      </div>

      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center justify-start text-2xl">
          <FolderIcon class="h-4 w-4 mr-2 text-text_dark_2" />
          Folders
        </div>
        <BaseDropdown align-content="right">
          <template #toggle="{ toggle }">
            <BaseButton @click="toggle" class="border border-divider_dark_1">
              <template v-slot:icon>
                Last Modified
                <ChevronDownIcon class="h-4 w-4 ml-2 text-text_dark_2" />
              </template>
            </BaseButton>
          </template>
          <div>
            <BaseDropdownItem>
              <span>Date Created</span>
            </BaseDropdownItem>
            <BaseDropdownItem>
              <span>Last Modified</span>
            </BaseDropdownItem>
            <BaseDropdownItem>
              <span>Alphabetical</span>
            </BaseDropdownItem>
          </div>
        </BaseDropdown>
      </div>

      <div class="flex items-start justify-start w-full gap-4 mb-20">
        <div v-for="folder in folders" :key="folder.id" class="w-[25%] h-32">
          <router-link
            to="/"
            class="flex flex-col items-start justify-between border bg-divider_light_2 border-black_mute rounded-lg h-full w-full p-4 hover:bg-gray_dark_4 hover:shadow-md hover:shadow-gray_dark_1 transition ease-in-out delay-20"
          >
            <div class="h-full w-full flex flex-col justify-between">
              <div class="text-xl pb-3">{{ folder.title }}</div>
              <div class="flex items-center justify-between w-full">
                <div class="text-xs pb-0.5 text-gray_light_1">
                  <span v-if="folder.projects.length > 0">
                    {{ folder.projects.length }} projects
                  </span>
                  <span v-else> No projects </span>
                </div>
                <div>
                  <BaseDropdown align-content="right">
                    <template #toggle="{ toggle }">
                      <BaseButton @click="toggle" class="hover:bg-gray_dark_1">
                        <template v-slot:icon>
                          <EllipsisHorizontalIcon class="h-6 w-6 text-text_dark_2" />
                        </template>
                      </BaseButton>
                    </template>
                    <div>
                      <BaseDropdownItem>
                        <span class="text-sm">Rename</span>
                      </BaseDropdownItem>
                      <BaseDropdownItem>
                        <span class="text-sm text-red">Delete</span>
                      </BaseDropdownItem>
                    </div>
                  </BaseDropdown>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center justify-start text-2xl">
          <DocumentTextIcon class="h-4 w-4 mr-2 text-text_dark_2" />
          Projects
        </div>
      </div>

      <div class="flex items-center justify-between mb-6">
        <div class="w-64">
          <BaseFormInput
            :model-value="inputValue"
            :name="'search'"
            :input-type="'text'"
            :is-disabled="isDisabled"
            placeholder="Search projects"
            @update:model-value="handleChange"
            @blur="handleBlur"
          >
            <template #prefix>
              <MagnifyingGlassIcon class="h-4 w-4 mr-2 text-text_dark_2" />
            </template>
            <template v-if="inputValue" #postfix>
              <XCircleIcon class="h-4 w-4 ml-2 text-text_dark_2" />
            </template>
          </BaseFormInput>
        </div>
        <BaseDropdown align-content="right">
          <template #toggle="{ toggle }">
            <BaseButton @click="toggle" class="border border-divider_dark_1">
              <template v-slot:icon>
                Last Modified
                <ChevronDownIcon class="h-4 w-4 ml-2 text-text_dark_2" />
              </template>
            </BaseButton>
          </template>
          <div>
            <BaseDropdownItem>
              <span>Date Created</span>
            </BaseDropdownItem>
            <BaseDropdownItem>
              <span>Last Modified</span>
            </BaseDropdownItem>
            <BaseDropdownItem>
              <span>Alphabetical</span>
            </BaseDropdownItem>
          </div>
        </BaseDropdown>
      </div>

      <div class="flex items-start justify-start w-full gap-4 mb-20">
        <div class="grid grid-cols-4 gap-4 w-full">
          <div v-for="project in projects" :key="project.id" class="h-28">
            <router-link
              :to="`/projects/${project.id}`"
              class="flex flex-col items-start justify-between border bg-divider_light_2 border-black_mute rounded-lg h-full w-full p-4 hover:bg-gray_dark_4 transition ease-in-out delay-20"
            >
              <div class="flex flex-col items-start justify-between h-full w-full">
                <div class="flex flex-row items-center justify-between w-full">
                  <div class="text-lg">{{ project.name }}</div>
                  <BaseFormCheckbox
                    :name="`${project.id}`"
                    @update:model-value.stop="handleChangeCheckbox"
                  />
                </div>
                <div class="flex flex-row items-center justify-between w-full">
                  <div class="text-gray_light_1 text-xs">{{ project.date }}</div>
                  <div>
                    <BaseDropdown align-content="right">
                      <template #toggle="{ toggle }">
                        <BaseButton @click="toggle" class="hover:bg-gray_dark_1">
                          <template v-slot:icon>
                            <EllipsisHorizontalIcon class="h-6 w-6 text-text_dark_2" />
                          </template>
                        </BaseButton>
                      </template>
                      <div>
                        <BaseDropdownItem>
                          <span class="text-sm">Rename</span>
                        </BaseDropdownItem>
                        <BaseDropdownItem>
                          <span class="text-sm">Move to folder</span>
                        </BaseDropdownItem>
                        <BaseDropdownItem>
                          <span class="text-sm text-red">Delete</span>
                        </BaseDropdownItem>
                      </div>
                    </BaseDropdown>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
// import type { Ref } from 'vue'

// import { FolderIcon } from '@heroicons/vue/24/solid'
// import { ChevronDownIcon } from '@heroicons/vue/24/solid'
// import { EllipsisHorizontalIcon } from '@heroicons/vue/24/solid'
// import { DocumentTextIcon } from '@heroicons/vue/24/solid'
// import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
// import { XCircleIcon } from '@heroicons/vue/24/solid'
// import { FolderPlusIcon } from '@heroicons/vue/24/solid'
// import { DocumentPlusIcon } from '@heroicons/vue/24/solid'

// import { BaseButton } from '../../../shared/components'
// import { BaseDropdown } from '@/shared/ui/dropdown'
// import { BaseDropdownItem } from '@/shared/ui/dropdown'
// import { BaseFormInput } from '@/shared/ui/form/base'
// import { BaseFormCheckbox } from '@/shared/ui/form/base'

// const inputValue: Ref<string> = ref('')
// const isDisabled: Ref<boolean> = ref(false)

// const checkboxList = ['hover', 'focus', 'checked', 'active', 'error', 'disabled'] as const

// const createFolder = () => console.log('create folder')
// const createProject = () => console.log('create project')
// const handleChange = () => console.log(`handle change`)
// const handleBlur = () => console.log(`handle blur`)

// const handleChangeCheckbox = () => console.log(`handle checkbox`)

// const folders = [
//   {
//     id: 1,
//     title: 'long',
//     projects: [1, 2, 3],
//     path: '/'
//   },
//   {
//     id: 2,
//     title: 'last added',
//     projects: [],
//     path: '/'
//   },
//   {
//     id: 3,
//     title: 'great texts',
//     projects: [1, 2],
//     path: '/'
//   }
// ]

// const projects = [
//   {
//     id: 1,
//     name: '2024-04-10 Untitled (2)',
//     date: 'Last Wednesday at 9:40 AM'
//   },
//   {
//     id: 2,
//     name: '2024-04-10 Untitled',
//     date: '04/08/2024'
//   },
//   {
//     id: 3,
//     name: '2024-03-18 Untitled',
//     date: '04/03/2024'
//   },
//   {
//     id: 4,
//     name: 'Journey to Dubai',
//     date: '04/03/2024'
//   }
// ]
</script>
