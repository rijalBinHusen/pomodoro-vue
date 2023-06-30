import { ref } from "vue";

export const projects = ref([])

export function addProject (projectName) {

    projects.value.push({
        projectId: projects.value.length,
        projectName: projectName
    })

}