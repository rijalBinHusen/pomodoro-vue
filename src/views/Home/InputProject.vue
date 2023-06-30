<script setup>
import { onMounted, ref } from 'vue'

const emit = defineEmits(['close-form', 'add-project'])
const inputTitleRef = ref(null)

onMounted(() => {
  inputTitleRef.value.focus()
})

const projectName = ref('')

const closeForm = () => {
  emit('close-form')
}

const addProject = () => {
  if (projectName.value.name === '') {
    alert('Project name cannot be empty')
    return
  }
  emit('add-project', projectName.value)
}

</script>

<template>
  <div class="input-form card bg-white rounded-lg text-slate-500 overflow-hidden mt-6">
    <div class="card-body p-3 grid gap-3">
      <input
        type="text"
        class="py-3 px-2 placeholder:italic font-medium text-slate-900 text-xl focus:border-b"
        placeholder="Create new project"
        ref="inputTitleRef"
        v-model="projectName"
        @keyup.enter="addProject"
      />
      
    </div>
    <div class="card-footer bg-slate-200 p-2 flex flex-row gap-2 justify-end">
      <button class="py-2.5 px-5 rounded text-sm font-semibold" @click="closeForm">Cancel</button>
      <button
        class="py-2.5 px-5 rounded bg-slate-800/90 hover:bg-slate-800 text-rose-50 shadow-xl flex text-sm font-semibold flex-row self-end"
        @click="addProject"
      >
        Add project
      </button>
    </div>
  </div>
</template>
