import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateTodoDto } from '../../models/create-todo-dto';

@Component({
  selector: 'app-create-todo-form',
  templateUrl: './create-todo-form.component.html',
  styleUrls: ['./create-todo-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTodoFormComponent {
  @Output() onCreateTodo = new EventEmitter<CreateTodoDto>();

  public DESCRIPTION_CONTROL = 'description';

  public readonly form = new FormGroup({
    [this.DESCRIPTION_CONTROL]: new FormControl('', [Validators.required]),
  });

  public get isSubmitDisabled() {
    return this.form.invalid;
  }

  public hasControlError(control: string) {
    return this.form.get(control)?.invalid;
  }

  public submit() {
    this.onCreateTodo.emit(this.form.value);
  }
}
