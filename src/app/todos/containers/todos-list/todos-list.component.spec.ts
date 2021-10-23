import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TodosModule } from '../../todos.module';
import { TodosListComponent } from './todos-list.component';

describe('TodoListComponent', () => {
  it('initially, todos list is empty', async () => {
    await renderComponent();
    assertTodoCount(0);
  });

  it('adds a todo', async () => {
    await renderComponent();

    userEvent.type(screen.getByRole('textbox'), 'A test description');
    userEvent.click(screen.getByRole('button', { name: /add/i }));

    assertTodoCount(1);
  });

  it('removes a todo', async () => {
    await renderComponent();

    userEvent.type(screen.getByRole('textbox'), 'A test description');
    userEvent.click(screen.getByRole('button', { name: /add/i }));
    assertTodoCount(1);

    userEvent.click(screen.getByRole('button', { name: /delete/i }));
    assertTodoCount(0);
  });

  it('if "hide completed" is ticked, it will hide completed todos', async () => {
    await renderComponent();

    userEvent.type(screen.getByRole('textbox'), 'A test description');
    userEvent.click(screen.getByRole('button', { name: /add/i }));
    userEvent.click(screen.getByRole('button', { name: /complete/i }));
    assertTodoCount(1);

    userEvent.click(screen.getByLabelText(/hide completed/i));
    assertTodoCount(0);
    
    userEvent.click(screen.getByLabelText(/hide completed/i));
    assertTodoCount(1);
  });
});

const assertTodoCount = (total: number) => {
  expect(screen.queryAllByRole('listitem').length).toBe(total);
};

const renderComponent = () =>
  render(TodosListComponent, {
    imports: [TodosModule],
    excludeComponentDeclaration: true,
  });
