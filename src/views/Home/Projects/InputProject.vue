<script setup>
import { onMounted, ref } from 'vue'

const emit = defineEmits(['close-form', 'add-project', 'update-project'])
const props = defineProps({ projectName: String });
const isUpdateMode = ref(false);

const inputTitleRef = ref(null)

onMounted(() => {
  inputTitleRef.value.focus()
  projectNameEnter.value = props.projectName;
  if(props.projectName !== '') {
    isUpdateMode.value = true;
  }
})

const projectNameEnter = ref('')

const closeForm = () => {
  emit('close-form')
}

const emitProject = () => {
  if (projectNameEnter.value.name === '') {
    alert('Project name cannot be empty')
    return
  }
  
  const emitMode = isUpdateMode.value ? 'update-project' : 'add-project'

  emit(emitMode, projectNameEnter.value)

}

</script>

<template>
  <div class="input-form card bg-white rounded-lg text-slate-500 overflow-hidden mt-6">
    <div class="card-body grid gap-3">
      <input
        type="text"
        class="py-3 px-2 placeholder:italic font-medium text-slate-900 text-xl focus:border-b"
        placeholder="Create new project"
        ref="inputTitleRef"
        v-model="projectNameEnter"
        @keyup.enter="emitProject"
      />
      
    </div>
    <div class="card-footer bg-slate-200 p-2 flex flex-row gap-2 justify-end">
      <button class="py-2.5 px-5 rounded text-sm font-semibold" @click="closeForm">Cancel</button>
      <button
        class="py-2.5 px-5 rounded bg-slate-800/90 hover:bg-slate-800 text-rose-50 shadow-xl flex text-sm font-semibold flex-row self-end"
        @click="emitProject"
      >
        {{ isUpdateMode ? 'Update title' : 'Add project'}}
      </button>
    </div>
  </div>
</template>
