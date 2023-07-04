import { describe, it, expect } from 'vitest'
import { addProject, decrementTask, findProjectById, incrementTask, setProjectActive, updateProjectById, projectActive, projects, type project } from "./ProjectsState"
import { faker } from "@faker-js/faker"

function waitingFor() {
    return new Promise(resolve => {
        setTimeout(resolve, 20);
      });
}

describe("add project and collect all data that inserted", () => {
    let insertedData: project[] = []
    let insertedProjectId = 0;
    it("Should return different project id", async () => {
        for(let i = 1; i < 100; i++) {
            const projectName = faker.string.fromCharacters('qwerasdfghjklzxcvbnmtyuiopp[', 10)
            // add project
            const projectId = addProject(projectName);
            await waitingFor()
            // make sure that the id is different
            expect(projectId).not.equal(insertedProjectId)
            // set wasInsertedId variable
            insertedProjectId = projectId
            insertedData.push({ projectId, projectName, isDefault: false, tasks: 0 });
        }
    })

    it("data in state must be matched", async () => {
        for(let project of insertedData) {
            const findProject = findProjectById(project.projectId);

            expect(findProject.projectName).equal(project.projectName)
        }
    })

    it("increment task each project, data task in state must be matched", async () => {
        for(let i = 1; i < projects.value.length; i++) {
            incrementTask(i);
            incrementTask(i);
            await waitingFor()

            const findProject = findProjectById(i);

            expect(findProject.tasks).equal(2);
        }
    })

    it("decrement task, random project, data task in state must be matched", async () => {
        for(let i = 1; i < projects.value.length; i += 2) {
            decrementTask(i);
            await waitingFor()

            const findProject = findProjectById(i);

            expect(findProject.tasks).equal(1);
        }
    })

    it("set project active", async () => {
        for(let i = 1; i < projects.value.length; i++) {
            setProjectActive(i);
            await waitingFor()

            const findProject = findProjectById(i);

            expect(projectActive.value.projectId).toMatchObject(findProject.projectId);
            expect(projectActive.value.projectName).toMatchObject(findProject.projectName);
        }
    })

    it("update project name, data must be matched", async () => {
        for(let i = 1; i < projects.value.length; i++) {
            const newProjectName = faker.animal.bear()
            updateProjectById(i, newProjectName);
            await waitingFor()
            
            const findProject = findProjectById(i);

            expect(newProjectName).toMatchObject(findProject.projectName);
        }
    })
}, 10000000)