import { faker } from "@faker-js/faker"
import { describe, it, expect } from 'vitest';
import { mount, flushPromises } from "@vue/test-utils"
import FormInput from "./FormInput.vue"


describe('Form input task', () => {

  const propsTask = {
    name: 'your task name',
    count: 1,
    notes: 'Your task notes',
    target: 1
  }

  it('should render the component', () => {

    const wrapper = mount(FormInput, {
      props: propsTask
    });
    
    expect(wrapper.find('div').exists()).toBe(true);

  });

  it('Create new task', async () => {

    const wrapper = mount(FormInput, {
      props: propsTask
    });

    await flushPromises();
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
    expect(taskTarget.text()).equal(1);
    
    const newTaskName = faker.string.alphanumeric(10);
    // insert task name
    await taskName.setValue(newTaskName);
    await flushPromises()

    // show input task note text area
    await btnShowTaskNotes.trigger('click');
    await flushPromises()
    expect(taskNotes.exists()).toBe(true);

    // insert  task notes
    const newTaskNote = faker.string.symbol(30);
    await taskNotes.setValue(newTaskNote);
    await flushPromises()

    // increment target
    await btnIncrement.trigger('click');
    await btnIncrement.trigger('click');
    await flushPromises()
    await flushPromises()

    expect(taskTarget.text()).equal(2);

    // decrement target
    await btnDecrement.trigger('click');
    await flushPromises()
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