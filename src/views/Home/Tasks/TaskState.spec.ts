import { describe, it, expect } from 'vitest'
import { Tasks, taksState, taskIdActive, type Task } from "./TaskState"
import { faker } from "@faker-js/faker"

function waitingFor() {
    return new Promise(resolve => {
        setTimeout(resolve, 20);
      });
}

describe("add project and collect all data that inserted", () => {
    const taskClass = new Tasks();
    const { addTask, removeTask, setTaskActive, updateTask, markTaskFinished, moveTaskToProjectId } = taskClass;
    let insertedTaskId = 0;
    const insertedData = <Task[]>[];
    it("Should return different project id", async () => {
        for(let i = 1; i <= 100; i++) {
            const taskName = faker.string.fromCharacters('qwerasdfghjklzxcvbnmtyuiopp[', 20);
            const taskNotes = faker.string.fromCharacters('qwerasdfghjklzxcvbnmtyuiopp[', 10);
            const projectId = faker.number.int({ min: 1, max: 4 });
            // add project
            const taskId = addTask(taskName, 0, taskNotes, projectId, 1);
            await waitingFor()
            // make sure that the id is different
            expect(taskId).not.equal(insertedTaskId);
            // set wasInsertedId variable
            insertedTaskId = taskId
            insertedData.push({ 
                id: taskId, 
                name: taskName, 
                count:0, 
                notes: taskNotes, 
                isCompleted: false, 
                projectId, 
                target: 1, 
                isActive: i === 1 ? true : false 
            });
        }
    })
    
    it("data in state must be matched", async () => {
        for(let task of insertedData) {
            const findTask = taksState.value.find((rec) => rec?.id === task.id);

            expect(findTask.name).equal(task.name)
            expect(findTask.count).equal(task.count)
            expect(findTask.notes).equal(task.notes)
            expect(findTask.isCompleted).equal(task.isCompleted)
            expect(findTask.projectId).equal(task.projectId)
            expect(findTask.target).equal(task.target)
            expect(findTask.isActive).equal(task.isActive)
        }
    })

    it("Set task active and must be matched", async () => {
        for(let task of insertedData) {
            setTaskActive(task.id);
            await waitingFor()

            expect(taskIdActive.value).equal(task.id);
        }
    })

    it("update task property, data must be matched", async () => {
        for(let task of insertedData) {
            const newTaskName = faker.animal.bear()
            updateTask(task.id, newTaskName, 0, '', 0, 0);
            await waitingFor()
            
            const findTask = taksState.value.find((rec) => rec?.id === task.id);

            expect(newTaskName).equal(findTask.name);

            const newTaskCount = faker.number.int({min: 10 })
            updateTask(task.id, '', newTaskCount, '', 0, 0);
            await waitingFor()
            
            const findTask2 = taksState.value.find((rec) => rec?.id === task.id);

            expect(newTaskCount).equal(findTask2.count);

            const newTaskNotes = faker.string.fromCharacters('qwerasdfghjklzxcvbnmtyuiopp[', 20);
            updateTask(task.id, '', 0, newTaskNotes, 0, 0);
            await waitingFor()
            
            const findTask3 = taksState.value.find((rec) => rec?.id === task.id);

            expect(newTaskNotes).equal(findTask3.notes);
        }
    })
}, 1000000)