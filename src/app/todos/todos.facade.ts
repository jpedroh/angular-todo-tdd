import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CreateTodoDto } from './models/create-todo-dto';
import { Todo } from './models/todo';
import { TodosState } from './state/todos.state';

@Injectable()
export class TodosFacade {
  constructor(private readonly state: TodosState) {}

  public get todos$() {
    return this.state.todos$;
  }

  public get pendingTodos$() {
    return this.state.todos$.pipe(map(todos => todos.filter(todo => !todo.isCompleted)))
  }

  public createTodo(todo: CreateTodoDto) {
    this.state.createTodo(todo);
  }

  public completeTodo(todo: Todo) {
    this.state.completeTodo(todo)
  }

  public deleteTodo(todo: Todo) {
    this.state.deleteTodo(todo)
  }
}
