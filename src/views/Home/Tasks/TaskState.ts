import { ref } from "vue"
import { incrementTask, decrementTask } from "../Projects/ProjectsState"

export interface Task {
    id: number;
    name: string;
    count: number;
    notes: string;
    isCompleted: boolean;
    isActive: boolean;
    projectId: number;
    target: number;
}

export const taksState = ref(<Task[]>[])
export const taskIdActive = ref(<Number>0);
const lastId = ref(<Number>1);

export class Tasks {

    addTask (name: string, count: number, notes: string, projectId: number, target: number) {
        const isTaskEmpty = taksState.value.length === 0;

        const allId = <number[]>[lastId.value, taksState.value.length + 1]

        const taskId = Math.max(...allId);
        
        taksState.value.unshift({
            id: taskId,
            name,
            count,
            notes,
            isCompleted: false,
            isActive: isTaskEmpty ? true : false,
            projectId,
            target
        })
        
        if(isTaskEmpty || taskIdActive.value === 0) {
            taskIdActive.value = taskId;
        }

        incrementTask(projectId)

        lastId.value = taskId;

        return taskId;
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

        decrementTask(taksState.value[findIndex].projectId);
    }
    
    updateTask (taskId: number, name: string, count: number, notes: string, projectId: number, target: number) {

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
        // target
        if(record?.target !== target) {
            taksState.value[findIndex]['target'] = target;
        }
    }

    markTaskFinished(taskId: number) {
        // projectId 1 = Finished
        const findTask = taksState.value.findIndex((rec) => rec?.id === taskId);

        if(findTask > -1) {
            // decrement task on project
            decrementTask(taksState.value[findTask].id)
            // increment task on finished project
            incrementTask(1);
            // update task
            taksState.value[findTask].isCompleted = true;
        }
    }

    moveTaskToProjectId(taskId: number, projectId: number) {
        // projectId 4 = Finished
        const findTask = taksState.value.findIndex((rec) => rec?.id === taskId);

        if(findTask > -1) {
            // decrement task on project
            decrementTask(taksState.value[findTask].id)
            // increment task on finished project
            incrementTask(projectId);
            // update task
            taksState.value[findTask].projectId = projectId;
        }
    }
}