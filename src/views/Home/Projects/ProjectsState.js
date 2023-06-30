import { ref } from "vue";

export const projects = ref([
    { projectId: 1, projectName: 'Today', isDefault: true},
    { projectId: 2, projectName: 'Tomorow', isDefault: true },
    { projectId: 3, projectName: 'Planned', isDefault: true }
])

export const projectActive = ref('')

export function addProject (projectName) {

    const isProjectEmpty = projects.value.length === 0;

    const projectId = projects.value.length + 1;
    projects.value.push({
        projectId,
        projectName: projectName,
        isDefault: false
    })

    if(isProjectEmpty) {
        setProjectActive(projectId)
    }

}

export function setProjectActive (projectId) {
    projectActive.value = projectId
}