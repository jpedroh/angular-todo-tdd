import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTodoFormComponent } from './components/create-todo-form/create-todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateTodoFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class TodosModule {}
