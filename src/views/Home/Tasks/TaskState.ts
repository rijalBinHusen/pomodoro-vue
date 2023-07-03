import { ref } from "vue"

interface Task {
    id: number;
    name: string;
    count: number;
    notes: string;
    isCompleted: boolean;
    isActive: boolean;
    projectId: number;
}

export const taksState = ref(<Task[]>[])
export const taskIdActive = ref(<Number>0);

export class Tasks {

    addTask (name: string, count: number, notes: string, projectId: number) {
        const isTaskEmpty = taksState.value.length === 0;

        const taskId = taksState.value.length + 1;

        taksState.value.unshift({
            id: taskId,
            name,
            count,
            notes,
            isCompleted: false,
            isActive: false,
            projectId
        })

        if(isTaskEmpty) {
            this.setTaskActive(taskId)
        }
    }

    setTaskActive(taskId: number) {
        const findTask = taksState.value.findIndex((rec) => rec?.id === taskId);

        if(findTask > -1) {
            taskIdActive.value = taskId;
            taksState.value[findTask]['isActive'] = true;
        }
    }

    removeTask(taskId: number) {
        const findIndex = taksState.value.findIndex((rec) => rec?.id === taskId);

        if(findIndex > -1) {
            taksState.value.splice(findIndex, 1)

            if(taskIdActive.value === taskId) {
                taskIdActive.value = 0;
            }
        }
    }
    
    updateTask (taskId: number, name: string, count: number, notes: string, projectId: number) {

        const findIndex = taksState.value.findIndex((rec) => rec?.id === taskId);
        
        if(findIndex < 0) {
            alert(`Task doesn't exists`);
            return;
        }

        const record = taksState.value[findIndex];

        // name
        if(record?.name !== name) {
            taksState.value[findIndex]['name'] = name;
        }
        // count
        if(record?.count !== count) {
            taksState.value[findIndex]['count'] = count;
        }
        // notes
        if(record?.notes !== notes) {
            taksState.value[findIndex]['notes'] = notes;
        }
        // projectId
        if(record?.projectId !== projectId) {
            taksState.value[findIndex]['projectId'] = projectId;
        }
    }

}