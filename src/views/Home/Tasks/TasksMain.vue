<template>
    <div class="flex-row gap-2.5 w-96">
        <div
          class="nav-task mb-6 h-14 pb-4 border-b-2 border-emerald-400 flex flex-row justify-between items-center"
        >
          <span class="text-lg font-semibold">{{ projectActive?.projectName || 'Tasks' }}</span>
          <button
            class="p-1.5 rounded text-emerald-50 bg-emerald-600/80 hover:bg-emerald-600 flex flex-row"
          >
            <span class="material-icons font-bold">more_vert</span>
          </button>
        </div>

        <div class="flex flex-col gap-y-2 mb-6" v-if="listOfTask.length">
          <template v-for="(task, index) in listOfTask" :key="task.id">
          <TaskCard
            :index="index"
            :count="task.count"
            :isActive="task.isActive"
            :isCompleted="task.isCompleted"
            :name="task.name"
            :notes="task.notes"
            :projectId="task.projectId"
            :target="task.target"
            :id="task.id"
            @delete-task="removeTask(task.id)"
            @edit-task="editTask(task.id)"
          />

        </template>
        </div>

        <div v-if="formVisible" ref="formContainer">
          <FormInput
            @close-form="showForm"
            @add-task="addTask" 
          />
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
import { computed, nextTick, ref } from 'vue';
import { Tasks, type Task, taksState, taskIdActive } from "./TaskState";
import { projectActive } from "../Projects/ProjectsState"


const taskEdit = ref(<Task>{})
const formVisible = ref(false)
const formContainer = ref(null)
const { addTask: addNewTask, removeTask, updateTask } = new Tasks();


const addTask = (item: Task) => {

  addNewTask(item?.name, item?.count, item?.notes, projectActive.value.projectId, item?.target);
  showForm()

}

const editTask = (taskId: number) => {
  taskEdit.value = taksState.value.find((task) => task.id === taskId)
  showForm()
}

const showForm = async () => {
  formVisible.value = !formVisible.value
  await nextTick()
  if (formVisible.value === true) {
    formContainer.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

const listOfTask = computed(() => {
  return taksState.value.filter((rec) => rec?.projectId === projectActive.value.projectId);
})

</script>