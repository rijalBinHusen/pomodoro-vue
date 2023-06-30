<template>
    <div class="flex-row gap-2.5 w-96">
        <div
          class="nav-task h-14 pb-4 border-b-2 border-emerald-400 flex flex-row justify-between items-center"
        >
          <span class="text-lg font-semibold">Projects</span>
        </div>

        <div class="flex flex-col gap-y-2 mt-6" v-if="projects.length">
          <CardProject
            v-for="project in projects"
            :key="project.projectId"
            :projectId="project.projectId"
            :projectName="project.projectName"
            />
            <!-- @edit-project="editTask(task.id)" -->
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
import CardProject from "./CardProject.vue";

const isFormShow = ref(false);

function toggleForm () {
  isFormShow.value = !isFormShow.value
}

function addNewProject (projectName) {
  addProject(projectName)
  toggleForm()
}

</script>