import { EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { CreateTodoDto } from '../../models/create-todo-dto';
import { CreateTodoFormComponent } from './create-todo-form.component';

describe('CreateTodoFormComponent', () => {
  it('when description field is empty, add button is disabled', async () => {
    await render(CreateTodoFormComponent, { imports: [ReactiveFormsModule] });

    userEvent.clear(screen.getByPlaceholderText(/description/i));

    expect(screen.getByPlaceholderText(/description/i)).toBeInvalid();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('when description field is not empty, add button is enabled', async () => {
    await render(CreateTodoFormComponent, { imports: [ReactiveFormsModule] });

    userEvent.type(
      screen.getByPlaceholderText(/description/i),
      'Take a shower'
    );

    expect(screen.getByPlaceholderText(/description/i)).not.toBeInvalid();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('when I type a description and submit form, it emits event and reset form', async () => {
    const onCreateTodo = new EventEmitter<CreateTodoDto>();
    jest.spyOn(onCreateTodo, 'emit');

    await render(CreateTodoFormComponent, {
      imports: [ReactiveFormsModule],
      componentProperties: {
        onCreateTodo: onCreateTodo,
      },
    });

    userEvent.tab();
    userEvent.type(document.activeElement!, 'Take a shower');
    userEvent.tab();
    userEvent.type(document.activeElement!, '{enter}');

    expect(onCreateTodo.emit).toHaveBeenCalledWith({
      description: 'Take a shower',
    });
    expect(screen.getByRole('textbox')).toHaveTextContent('');
  });
});
