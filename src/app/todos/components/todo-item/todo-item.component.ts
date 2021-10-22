import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionEmitterDto } from 'src/app/utils/types/action-emitter';
import { Todo } from '../../models/todo';

export type TodoItemActionEmitter = ActionEmitterDto<'COMPLETE_TODO' | 'DELETE_TODO', Todo>

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() onAction = new EventEmitter<TodoItemActionEmitter>();
  
  completeTodo() {
    this.onAction.emit({ action: 'COMPLETE_TODO', payload: this.todo })
  }

  deleteTodo() {
    this.onAction.emit({ action: 'DELETE_TODO', payload: this.todo })
  }

  public get isTodoPending() {
    return !this.todo.isCompleted;
  }
}
