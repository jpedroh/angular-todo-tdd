import { firstValueFrom } from "rxjs";
import { Todo } from "../models/todo";
import { TodosState } from "./todos.state";

describe('TodosState', () => {
    let state: TodosState;

    beforeEach(() => {
        state = new TodosState();
    })

    it('it adds a todo', async () => {
        const description = 'This is an example';
        await expectStateToNotHaveTodoMatching({ description })

        state.createTodo({ description })

        await expectStateToHaveTodoMatching({ description })
    })

    it('marks a todo as completed', async () => {
        state.createTodo({ description: 'This is an example' })
        await expectStateToNotHaveTodoMatching({ description: 'This is an example', isCompleted: true })

        const todos = await firstValueFrom(state.todos$);
        state.completeTodo(todos[0])

        await expectStateToHaveTodoMatching({ description: 'This is an example', isCompleted: true })
    })

    it('removes a todo', async () => {
        state.createTodo({ description: 'This is an example' })
        await expectStateToHaveTodoMatching({ description: 'This is an example' })

        const todos = await firstValueFrom(state.todos$);
        state.deleteTodo(todos[0])

        await expectStateToNotHaveTodoMatching({ description: 'This is an example' })
    })

    const expectStateToHaveTodoMatching = async (aTodo: Partial<Todo>) => {
        const todos = await firstValueFrom(state.todos$);
        expect(todos).toEqual(expect.arrayContaining([expect.objectContaining(aTodo)]))
    }
    
    const expectStateToNotHaveTodoMatching = async (aTodo: Partial<Todo>) => {
        const todos = await firstValueFrom(state.todos$);
        expect(todos).toEqual(expect.not.arrayContaining([expect.objectContaining(aTodo)]))
    }
})