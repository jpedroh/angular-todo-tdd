import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActionEmitterMediator } from 'src/app/utils/types/action-emitter';
import { TodoItemActionEmitter } from '../../components/todo-item/todo-item.component';
import { CreateTodoDto } from '../../models/create-todo-dto';
import { Todo } from '../../models/todo';
import { TodosFacade } from '../../todos.facade';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css'],
})
export class TodosListComponent {
  public readonly hideCompleted = new FormControl(false);
  public readonly todos: Observable<Todo[]>;
  public readonly pendingTodos: Observable<Todo[]>;

  constructor(private readonly todosFacade: TodosFacade) {
    this.todos = this.todosFacade.todos$;
    this.pendingTodos = this.todosFacade.pendingTodos$;
  }

  public get todosList() {
    return this.hideCompleted.value ? this.pendingTodos : this.todos
  }

  createTodo(payload: CreateTodoDto) {
    this.todosFacade.createTodo(payload);
  }

  handleTodoAction({ action, payload }: TodoItemActionEmitter) {
    const actions: ActionEmitterMediator<TodoItemActionEmitter> = {
      COMPLETE_TODO: (payload) => this.todosFacade.completeTodo(payload),
      DELETE_TODO: (payload) => this.todosFacade.deleteTodo(payload),
    };

    actions[action](payload);
  }
}
