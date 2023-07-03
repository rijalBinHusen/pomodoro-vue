import { ref } from "vue";

export interface project {
    projectId: number;
    projectName: string;
    isDefault: boolean;
    tasks: number;
}

export const projects = ref(<project[]>[
    { projectId: 1, projectName: 'Today', isDefault: true, tasks: 0},
    { projectId: 2, projectName: 'Tomorow', isDefault: true, tasks: 0 },
    { projectId: 3, projectName: 'Planned', isDefault: true, tasks: 0 }
])

export const projectActive = ref(<{
    projectId: number;
    projectName: string;
}>{})

export function addProject (projectName: string) {

    const isProjectEmpty = projects.value.length === 0;

    const projectId = projects.value.length + 1;

    projects.value.push({
        projectId,
        projectName,
        isDefault: false,
        tasks: 0,
    })

    if(isProjectEmpty) {
        setProjectActive(projectId)
    }

}

export function setProjectActive (projectId: number) {
    const findProject = projects.value.find((rec) => rec?.projectId === projectId);

    if(findProject) {

        projectActive.value = {
            projectId: findProject?.projectId,
            projectName: findProject?.projectName
        }

    }
}

export function findProjectById (projectId: number) {

    return projects.value.find((rec) => rec?.projectId === projectId);

}

export function updateProjectById (projectId: number, projectName: string) {
    const findIndex = projects.value.findIndex((rec) => rec?.projectId === projectId);

    if(findIndex > -1) {
        projects.value[findIndex]['projectName'] = projectName;
    }
    
}

export function incrementTask (projectId: number) {
    const findIndex = projects.value.findIndex((rec) => rec?.projectId === projectId);

    if(findIndex > -1) {
        projects.value[findIndex]['tasks']++;
    }
}

export function decrementTask (projectId: number) {
    const findIndex = projects.value.findIndex((rec) => rec?.projectId === projectId);

    if(findIndex > -1) {
        projects.value[findIndex]['tasks']--;
    }
}