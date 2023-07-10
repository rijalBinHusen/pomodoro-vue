import { describe, it, expect, vi } from 'vitest';
import { shallowMount, flushPromises } from "@vue/test-utils"
import { faker } from "@faker-js/faker"
import TaskMain from "./TasksMain.vue";

describe("Unit testing task main", () => {
    // const test1 = "Task main component must be exists, add task button must be exists";
    // const test2 = "Click add task button, form input task must be exists";
    // const test3 = "Set value in form input and trigger add task, the input form must emit add-task";
    const test4 = "After add new task, the task card must be exists";
    const test5 = "Edit task, the form input must be emit update-task";
    const test6 = "After update task, the task card value must same as new update value";
    const test7 = "Delete task, the task card must be empty";
    it("Task main component must be exists, add task button must be exists", async () => {
        const wrapper = shallowMount(TaskMain);
        await flushPromises();

        const taskMainBoard = wrapper.find("#task-main-board");
        const buttonAddTask = wrapper.find("#task-main-button-add-task");

        expect(taskMainBoard.exists()).toBe(true);
        expect(buttonAddTask.exists()).toBe(true);
    });

    it("Click add task button, form input task must be exists", async () => {
        const wrapper = shallowMount(TaskMain);
        await flushPromises()

        const buttonAddTask = wrapper.find("#task-main-button-add-task");
        expect(buttonAddTask.exists()).toBe(true);

        buttonAddTask.trigger('click');
        await flushPromises()

        const formInputComponent =  wrapper.find("#form-input-task");
        expect(formInputComponent.exists()).toBe(true);
    });

    it("Set value in form input and trigger add task, the input form must be hidden", async () => {
        
        const wrapper = shallowMount(TaskMain);
        await flushPromises()

        const buttonAddTask = wrapper.find("#task-main-button-add-task");
        expect(buttonAddTask.exists()).toBe(true);

        buttonAddTask.trigger('click');
        await flushPromises()

        const formInputComponent =  wrapper.find("#form-input-task");
        const taskName = wrapper.find('#task-name');
        const btnIncrement = wrapper.find('#button-increment-task');
        const btnDecrement = wrapper.find('#button-decrement-task');
        const btnShowTaskNotes = wrapper.find('#button-show-task-notes');
        const taskNotes = wrapper.find('#task-notes');
        const btnCloseForm = wrapper.find('#button-close-form');
        const btnAddTask = wrapper.find('#button-add-task');
        const taskTarget = wrapper.find('#task-target')
    
        expect(taskName.exists()).toBe(true);
        expect(btnIncrement.exists()).toBe(true);
        expect(btnDecrement.exists()).toBe(true);
        expect(btnShowTaskNotes.exists()).toBe(true);
        expect(btnCloseForm.exists()).toBe(true);
        expect(btnAddTask.exists()).toBe(true);
        expect(taskTarget.exists()).toBe(true);
    
        expect(btnShowTaskNotes.text()).toBe('+ Add Note')
        expect(btnAddTask.text()).toBe('Add Task')
        // expect(taskTarget.text()).equal(1);
        
        const newTaskName = faker.string.alphanumeric(10);
        // insert task name
        const sypeOnTaskName = vi.spyOn(taskName, 'setValue');
        await taskName.setValue(newTaskName);
    
        expect(sypeOnTaskName).toHaveBeenCalledOnce();
        await flushPromises()
        expect(taskName.element.value).equal(newTaskName);
    
        // show input task note text area
        await btnShowTaskNotes.trigger('click');
        await flushPromises()
        expect(taskNotes.exists()).toBe(true);
    
        // insert  task notes
        const newTaskNote = faker.string.symbol(30);
        await taskNotes.setValue(newTaskNote);
        await flushPromises()
    
        // increment target
        const spyOnBtnIncrement = vi.spyOn(btnIncrement, 'trigger');
        await btnIncrement.trigger('click');
        expect(spyOnBtnIncrement).toHaveBeenCalledOnce();
    
        await btnIncrement.trigger('click');
        await flushPromises()
        await flushPromises()
    
        expect(taskTarget.element.value).equal('3');
    
        // decrement target
        await btnDecrement.trigger('click');
        await flushPromises()
        expect(taskTarget.element.value).equal('2');
    
        // add task
        await btnAddTask.trigger('click');
        await flushPromises()

        expect(formInputComponent).toBe(false);
    })
})