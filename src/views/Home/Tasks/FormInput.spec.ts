import { faker } from "@faker-js/faker"
import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from "@vue/test-utils"
import FormInput from "./FormInput.vue"


function mountTheComponent() {

  const propsTask = {
    name: 'your task name',
    count: 1,
    notes: 'Your task notes',
    target: 1
  }

  const wrapper = mount(FormInput, {
    props: propsTask
  });

  return wrapper;
}


describe('Form input task', () => {

  it('should render the component', () => {
        
    expect(mountTheComponent().find('div').exists()).toBe(true);

  });

  it('The task name value must same bruh', async () => {
    
    const wrapper = mountTheComponent();
    const valueToSet = faker.string.sample(30);

    await flushPromises();

    const taskName = wrapper.find('#task-name');
    expect(taskName.exists()).toBe(true);

    const spyOnTaskName = vi.spyOn(taskName, 'setValue');
    await taskName.setValue(valueToSet);
    wrapper.vm.$emit('add-task');
    await flushPromises();
    
    expect(spyOnTaskName).toHaveBeenCalledOnce();
    expect(taskName.element.value).equal(valueToSet);
  })

  it('Create new task', async () => {

    const wrapper = mountTheComponent();

    await flushPromises();
    expect(wrapper).toBeTruthy()

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
    
    // the emitted value we got like this [ [ { key: value, key: value } ] ]
    const emittedValue = wrapper.emitted('add-task')[0][0];
    expect(emittedValue?.name).equal(newTaskName);
    expect(emittedValue?.count).equal(0);
    expect(emittedValue?.target).equal(2);
    expect(emittedValue?.notes).equal(newTaskNote);
    // close-form
    console.log()

  });

//   it('should call the `onClick()` method when the button is clicked', () => {
    
//     const wrapper = mount(FormInput);
//     wrapper.find('button').trigger('click');
    
//   });
});


// mount component (V)