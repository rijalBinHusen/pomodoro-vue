import { faker } from "@faker-js/faker"
import { describe, it, expect } from 'vitest';
import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import jsdom from "jsdom";
import FormInput from "./FormInput.vue"

const { window } = jsdom.fromFile('./index.html');

// import { mount } from 'vitest';
// import jsdom from 'jsdom';
// import MyComponent from './MyComponent.vue';

// const { window } = jsdom.fromFile('./index.html');

// describe('MyComponent', () => {
//   it('should render the correct text', () => {
//     const wrapper = mount(MyComponent, {
//       attachTo: window.document,
//     });
//     expect(wrapper.text()).toBe('Hello, world!');
//   });
// });


describe('Form input task', () => {

  it('should render the component', () => {

    const wrapper = mount(FormInput);
    expect(wrapper.find('div').exists()).toBe(true);

  });

  it('Create new task', async () => {

    const wrapper = mount(FormInput);
    const taskName = wrapper.find('#task-name');
    const btnIncrement = wrapper.find('#btnIncrementTask');
    const btnDecrement = wrapper.find('#btnDecrementTask');
    const btnShowTaskNotes = wrapper.find('#btnShowTaskNotes');
    const taskNotes = wrapper.find('#taskNotes');
    const btnCloseForm = wrapper.find('#btnCloseForm');
    const btnAddTask = wrapper.find('#btnAddTask');
    const taskTarget = wrapper.find('#taskTarget')

    expect(taskName.exists()).toBe(true);
    expect(btnIncrement.exists()).toBe(true);
    expect(btnDecrement.exists()).toBe(true);
    expect(btnShowTaskNotes.exists()).toBe(true);
    expect(btnCloseForm.exists()).toBe(true);
    expect(btnAddTask.exists()).toBe(true);
    expect(taskTarget.exists()).toBe(true);
    
    const newTaskName = faker.string.alphanumeric(10);
    // insert task name
    await taskName.setValue(newTaskName);
    await nextTick()

    // show input task note text area
    await btnShowTaskNotes.trigger('click');
    await nextTick()
    expect(taskNotes.exists()).toBe(true);

    // insert  task notes
    const newTaskNote = faker.string.symbol(30);
    await taskNotes.setValue(newTaskNote);
    await nextTick()

    // increment target
    await btnIncrement.trigger('click');
    await btnIncrement.trigger('click');
    await nextTick()

    expect(taskTarget.text()).equal(2);

    // decrement target
    await btnDecrement.trigger('click');
    await nextTick()
    expect(taskTarget.text()).equal(1);

    // add task
    await btnAddTask.trigger('click');

    // trigger the emit
    // wrapper.vm.$emit('add-task');

    // expect the emitted value
    expect(wrapper.emitted().name).equal(newTaskName);
    expect(wrapper.emitted().count).equal(0);
    expect(wrapper.emitted().notes).equal(newTaskNote);
    expect(wrapper.emitted().target).equal(1);
    // close-form

  });

//   it('should call the `onClick()` method when the button is clicked', () => {
    
//     const wrapper = mount(FormInput);
//     wrapper.find('button').trigger('click');
    
//   });
});

// mount component (V)