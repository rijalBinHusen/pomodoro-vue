<template>
    <div class="flex-row gap-2.5 w-96">
        <div
          class="nav-task mb-6 h-14 pb-4 border-b-2 border-emerald-400 flex flex-row justify-between items-center"
        >
          <span class="text-lg font-semibold">Tasks</span>
          <button
            class="p-1.5 rounded text-emerald-50 bg-emerald-600/80 hover:bg-emerald-600 flex flex-row"
          >
            <span class="material-icons font-bold">more_vert</span>
          </button>
        </div>

        <div class="flex flex-col gap-y-2 mb-6" v-if="tasks.length">
          <TaskCard
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @delete-task="deleteTask(task.id)"
            @edit-task="editTask(task.id)"
          />
        </div>

        <div v-if="formVisible" ref="formContainer">
          <FormInput @close-form="showForm" @add-task="addTask" />
        </div>

        <button
          v-else
          class="py-2 mt-6 bg-emerald-800/70 text-lg w-full font-semibold text-emerald-200 hover:bg-emerald-800 rounded border-2 border-dashed border-emerald-400 flex flex-row gap-1 items-center justify-center"
          @click="showForm"
        >
          <span class="material-icons"> add_circle </span> Add Task
        </button>
      </div>
</template>

<script setup lang="ts"> 

import FormInput from './FormInput.vue'
import TaskCard from './TaskCard.vue'
import { nextTick, ref } from 'vue';
import { Tasks } from "./TaskState";


const task = ref(null)
const formVisible = ref(false)
const formContainer = ref(null)


const addTask = (item) => {
  tasks.push(item)
  if (taskActive.id === null) {
    setTaskActive(item)
  }
  formVisible.value = false
}

const deleteTask = (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id)
  tasks.splice(taskIndex, 1)
}

const editTask = (id) => {
  task.value = tasks.find((task) => task.id === id)
  showForm()
}

const showForm = async () => {
  formVisible.value = !formVisible.value
  await nextTick()
  if (formVisible.value === true) {
    formContainer.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

</script>