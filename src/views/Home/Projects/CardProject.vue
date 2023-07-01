<script setup>
import { computed, defineProps } from 'vue'
import { projectActive, setProjectActive } from "./ProjectsState"

const emit = defineEmits(['edit-project'])

const props = defineProps({
    projectId: Number,
    projectName: String,
    projectDefault: Boolean,
})



const isActive = computed(() => {
  return projectActive.value === props.projectId
})

const editProject = () => {
  emit('edit-project')
}

function setAsProjectActive () {
    setProjectActive(props.projectId)
}


</script>

<template>
  <div
    :class="{
      'border-slate-900 mr-2 opacity-100': isActive,
      'hover:border-slate-900/30 opacity-70': !isActive
    }"
    class="transition-colors duration-700 transform px-3 w-full bg-white text-slate-900 rounded flex flex-col border-l-[6px] group hover:cursor-pointer"
    @click="setAsProjectActive"
  >
    <div class="flex flex-row items-center justify-between py-1">
      <h3 class="flex items-center font-semibold text-lg">
        <span
          class="material-icons font-bold mr-2"
          >
        {{ isActive ? 'check_circle' : 'remove_circle' }}
        </span>
        <span class="break-all">
          {{ props.projectName }}
        </span>
      </h3>
      <div v-if="!props.projectDefault" class="flex flex-row gap-2 items-center">
        <button
            class="flex flex-row items-center gap-2 hover:bg-slate-200 w-full p-1 rounded"
            @click="editProject"
        >
            <span class="material-icons font-bold !text-sm">edit</span>
            <span class="text-sm">Edit</span>
        </button>
      </div>
    </div>
  </div>
</template>
