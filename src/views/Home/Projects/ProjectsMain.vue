<template>
    <div class="flex-row gap-2.5 w-64">
        <div
          class="nav-task h-14 pb-4 border-b-2 border-emerald-400 flex flex-row justify-between items-center"
        >
          <span class="text-lg font-semibold">Projects</span>
        </div>

        <div class="flex flex-col gap-y-1 mt-6" v-if="projects.length">
          <CardProject
            v-for="project in projects"
            :key="project.projectId"
            :projectId="project.projectId"
            :projectName="project.projectName"
            :projectDefault="project.isDefault"
            @edit-project="editProject(project.projectId)"
            />
        </div>

        <div v-if="isFormShow" ref="formContainer">
          <InputProject 
              :projectName="projectNameOnEdit" 
              @close-form="toggleForm" 
              @add-project="addNewProject" 
              @update-project="updateProjectName"
          />
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
import { projects, addProject, findProjectById, updateProjectById } from "./ProjectsState"
import InputProject from "./InputProject.vue";
import CardProject from "./CardProject.vue";

const isFormShow = ref(false);
const projectIdOnEdit = ref(false);
const projectNameOnEdit = ref('');

function toggleForm () {
  isFormShow.value = !isFormShow.value
  projectIdOnEdit.value = '';
  projectNameOnEdit.value = '';
}

function addNewProject (projectName) {
  addProject(projectName)
  toggleForm()
}

function editProject (projectId) {
  const findProject = findProjectById(projectId);
  toggleForm();
  projectIdOnEdit.value = projectId;
  projectNameOnEdit.value = findProject?.projectName;
}

function updateProjectName (projectName) {
  updateProjectById(projectIdOnEdit.value, projectName);
  toggleForm();
}

</script>