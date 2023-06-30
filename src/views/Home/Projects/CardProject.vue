<script setup>
import { computed, defineProps } from 'vue'
import { projectActive, setProjectActive } from "./ProjectsState"

const emit = defineEmits(['edit-project'])

const props = defineProps({
    projectId: Number,
    projectName: String,
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
      'border-slate-900': isActive,
      'hover:border-slate-900/30': !isActive
    }"
    class="px-3 py-2 w-full bg-white text-slate-900 rounded flex flex-col border-l-[6px] group hover:cursor-pointer"
    @click="setAsProjectActive"
  >
    <div class="flex flex-row items-center justify-between py-2">
      <h3 class="flex items-center font-semibold text-lg">
        <span
          :class="['material-icons font-bold mr-2', isActive ? ' opacity-100 ' : ' opacity-70 ']"
          >check_circle</span
        >
        <span>
          {{ props.projectName }}
        </span>
      </h3>
      <div class="flex flex-row gap-2 items-center">
        <!-- <span class="font-semibold text-slate-800/70">
          {{ task.count + ' /' + task.target }}
        </span> -->
        <!-- <div class="relative dropdown-wrapper">
          <button
            class="p-1 rounded text-slate-400 bg-white hover:bg-slate-200/40 flex flex-row border border-slate-400/50"
            @click="showDropdown = !showDropdown"
          >
            <span class="material-icons font-bold">more_vert</span>
          </button>
          <div
            @mouseenter="mouseIsInside = true"
            @mouseleave="mouseIsInside = false"
            class="absolute right-0 top-2 translate-y-1/2 bg-white shadow-lg rounded p-1 w-48 z-20 border"
            v-show="showDropdown"
          >
            <button
              class="flex flex-row items-center gap-2 hover:bg-slate-200 w-full p-1 rounded"
              @click="markAsCompleted"
            >
              <span class="material-icons font-bold !text-sm">check_circle</span>
              <span class="text-sm">Mark As Completed</span>
            </button>
        -->
            <button
              class="flex flex-row items-center gap-2 hover:bg-slate-200 w-full p-1 rounded"
              @click="editProject"
            >
              <span class="material-icons font-bold !text-sm">edit</span>
              <span class="text-sm">Edit</span>
            </button>
            <!-- <button
              class="flex flex-row items-center gap-2 hover:bg-slate-200 w-full p-1 rounded"
              @click="deleteTask"
            >
              <span class="material-icons font-bold !text-sm">delete</span>
              <span class="text-sm">Delete</span>
            </button>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
