<template>
    <div class="flex-row gap-2.5 w-96">
        <div
          class="nav-task pb-4 border-b-2 border-emerald-400 flex flex-row justify-between items-center"
        >
          <span class="text-lg font-semibold">Projects</span>
          <button
            class="p-1.5 rounded text-emerald-50 bg-emerald-600/80 hover:bg-emerald-600 flex flex-row"
          >
            <span class="material-icons font-bold">more_vert</span>
          </button>
        </div>

        <div class="flex flex-col gap-y-2 mt-6" v-if="projects.length">
          <!-- <TaskCard
            v-for="task in projects"
            :key="task.id"
            :task="task"
            @delete-task="deleteTask(task.id)"
            @edit-task="editTask(task.id)"
          /> -->
        </div>

        <div v-if="isFormShow" ref="formContainer">
          <InputProject @close-form="toggleForm" @add-project="addNewProject" />
        </div>

        <button
          v-else
          class="py-2 mt-6 bg-emerald-800/70 text-lg w-full font-semibold text-emerald-200 hover:bg-emerald-800 rounded border-2 border-dashed border-emerald-400 flex flex-row gap-1 items-center justify-center"
          @click="toggleForm"
        >
          <span class="material-icons"> add_circle </span> Add project
        </button>
      </div>
</template>

<script setup>

import { ref } from "vue";
import { projects, addProject } from "./ProjectsState"
import InputProject from "./InputProject.vue";

const isFormShow = ref(false);

function toggleForm () {
  isFormShow.value = !isFormShow.value
}

function addNewProject (projectName) {
  addProject(projectName)
  toggleForm()
}

</script>