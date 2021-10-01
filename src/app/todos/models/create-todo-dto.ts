import { Todo } from "./todo";

export type CreateTodoDto = Pick<Todo, 'description'>