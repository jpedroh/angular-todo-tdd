import { BehaviorSubject } from "rxjs";
import { CreateTodoDto } from "../models/create-todo-dto";
import { Todo } from "../models/todo";

export class TodosState {
    private readonly todos = new BehaviorSubject<Todo[]>([]);

    public get todos$() {
        return this.todos.asObservable()
    }

    public createTodo(payload: CreateTodoDto) {
        const todos = this.todos.getValue()
        const todo: Todo = {
            id: todos.length + 1,
            isCompleted: false,
            createdAt: new Date(),
            ...payload
        }

        this.todos.next([...todos, todo])
    }

    public completeTodo(aTodo: Todo) {
        const todos = this.todos.getValue().map(todo => {
            return {
                ...todo,
                isCompleted: todo.id === aTodo.id ? true : todo.isCompleted
            }
        })

        this.todos.next(todos)
    }

    public deleteTodo(aTodo: Todo) {
        const todos = this.todos.getValue().filter(todo => aTodo.id !== todo.id)

        this.todos.next(todos)
    }
}