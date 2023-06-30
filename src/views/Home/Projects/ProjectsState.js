import { ref } from "vue";

export const projects = ref([])

export const projectActive = ref('')

export function addProject (projectName) {

    projects.value.push({
        projectId: projects.value.length,
        projectName: projectName
    })

}

export function setProjectActive (projectId) {
    projectActive.value = projectId
}