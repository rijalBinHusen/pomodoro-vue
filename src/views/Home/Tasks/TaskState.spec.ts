import { describe, it, expect } from 'vitest'
import { Tasks, taksState, taskIdActive } from "./TaskState"
import { faker } from "@faker-js/faker"


describe("add project and collect all data that inserted", () => {
    const taskClass = new Tasks();
    const { addTask, removeTask, setTaskActive, updateTask, markTaskFinished, moveTaskToProjectId } = taskClass;
})