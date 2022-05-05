import * as React from 'react'
import { deleteCategory } from '../service/categoryService'
import { useCategoryState } from '../stateManagement/ContextProvider'
import { category, stateAction, todo, todoList } from '../stateManagement/reducer'
import Todo from './Todo'
import TodoForm from './TodoForm'
import UpdateTodoForm from './UpdateTodoForm'

interface Props {
  category: { id: number; title: string; todoList: todoList }
}

const Category: React.FunctionComponent<Props> = ({ category }) => {
  const [todoToUpdate, setTodoToUpdate] = React.useState<todo>({} as todo)
  const { dispatch } = useCategoryState()

  const deleteSingleCategory = async (category: category) => {
    const wasDeleted = await deleteCategory(category)
    if (wasDeleted) {
      dispatch({ type: stateAction.DELETE_CATEGORY, payload: category })
    }
  }

  return (
    <div className='border-orange-500 border p-4 m-4'>
      <div className='flex justify-evenly'>
        <span className='mt-2 text-4xl font-bold leading-normal mb-2 text-orange-500 hover:text-orange-400 hover:underline cursor-pointer'>
          {category.title}
        </span>
        <button
          className='rounded bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent'
          onClick={() => deleteSingleCategory(category)}
        >
          Delete
        </button>
      </div>
      {todoToUpdate.title ? (
        <UpdateTodoForm todoToUpdate={todoToUpdate} setTodoToUpdate={setTodoToUpdate} />
      ) : (
        <TodoForm parentCategory={category} />
      )}
      {category.todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoToUpdate={setTodoToUpdate} />
      ))}
    </div>
  )
}

export default Category
