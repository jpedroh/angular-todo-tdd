import { EventEmitter } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { Todo } from '../../models/todo';
import {
  TodoItemActionEmitter,
  TodoItemComponent,
} from './todo-item.component';

describe('TodoItemComponent', () => {
  it('renders todo description and delete button', async () => {
    await renderComponent({
      todo: makeTodo({ description: 'A simple description' }),
    });
    expect(screen.getByText(/a simple description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  test('if todo is completed it do not render Complete Todo button', async () => {
    await renderComponent({ todo: makeTodo({ isCompleted: true }) });
    const completeButton = screen.queryByRole('button', { name: /complete/i });
    expect(completeButton).not.toBeInTheDocument();
  });

  test('if todo is not completed it renders Complete Todo button', async () => {
    await renderComponent({ todo: makeTodo({ isCompleted: false }) });
    const completeButton = screen.queryByRole('button', { name: /complete/i });
    expect(completeButton).toBeInTheDocument();
  });

  test('when click on complete button, it emits event', async () => {
    const { defaultTodo, onActionMock } = await renderComponent();
    userEvent.click(screen.getByRole('button', { name: /complete/i }));
    expect(onActionMock.emit).toHaveBeenCalledWith({
      action: 'COMPLETE_TODO',
      payload: defaultTodo,
    });
  });
  test('when click on delete button, it emits event', async () => {
    const { defaultTodo, onActionMock } = await renderComponent();
    userEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(onActionMock.emit).toHaveBeenCalledWith({
      action: 'DELETE_TODO',
      payload: defaultTodo,
    });
  });
});

const renderComponent = async (props: Partial<TodoItemComponent> = {}) => {
  const onActionMock = new EventEmitter<TodoItemActionEmitter>();
  jest.spyOn(onActionMock, 'emit');

  const defaultTodo = makeTodo();

  await render(TodoItemComponent, {
    componentProperties: {
      todo: defaultTodo,
      onAction: onActionMock,
      ...props,
    },
  });

  return { onActionMock, defaultTodo };
};

const makeTodo = (props: Partial<Todo> = {}): Todo => {
  return {
    id: 1,
    description: 'A simple description',
    createdAt: new Date(),
    isCompleted: false,
    ...props,
  };
};
