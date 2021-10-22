import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTodoFormComponent } from './components/create-todo-form/create-todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

@NgModule({
  declarations: [CreateTodoFormComponent, TodoItemComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class TodosModule {}
