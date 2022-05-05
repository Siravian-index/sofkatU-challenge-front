import * as React from 'react'
import { deleteTodo, updateTodo } from '../service/todoService'
import { useTodoState } from '../stateManagement/ContextProvider'
import { todo, todoAction } from '../stateManagement/reducer'
import EmptyTodos from './EmptyTodos'
import Todo from './Todo'

const TodoList: React.FC = () => {
  // logica
  const { state: todoList, dispatch } = useTodoState()

  const checkBox = async (e: React.ChangeEvent<HTMLInputElement>, todo: todo) => {
    const updatedTodo = await updateTodo({ ...todo, isDone: !todo.isDone })
    dispatch({ type: todoAction.UPDATE, payload: updatedTodo })
  }

  const deleteOnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, todo: todo) => {
    const shouldBeDeleted: boolean = await deleteTodo(todo)
    if (shouldBeDeleted) {
      dispatch({ type: todoAction.REMOVE, payload: todo })
    }
  }
  // jsx
  return (
    <div className='flex flex-col gap-4 mt-4 md:flex-row md:justify-evenly flex-wrap'>
      {todoList.length ? (
        todoList
          .slice()
          .sort((a, b) => Number(a.isDone) - Number(b.isDone))
          .map((t) => <Todo key={t.id} todo={t} checkBox={checkBox} deleteOnClick={deleteOnClick} />)
      ) : (
        <EmptyTodos />
      )}
    </div>
  )
}

export default TodoList
