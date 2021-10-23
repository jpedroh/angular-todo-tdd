import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTodoFormComponent } from './components/create-todo-form/create-todo-form.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodosListComponent } from './containers/todos-list/todos-list.component';
import { TodosState } from './state/todos.state';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosFacade } from './todos.facade';

@NgModule({
  declarations: [CreateTodoFormComponent, TodoItemComponent, TodosListComponent],
  imports: [CommonModule, ReactiveFormsModule, TodosRoutingModule],
  providers: [TodosFacade, TodosState]
})
export class TodosModule {}
