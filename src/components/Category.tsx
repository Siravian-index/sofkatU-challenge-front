import * as React from 'react'
import { deleteCategory } from '../service/categoryService'
import { useCategoryState } from '../stateManagement/ContextProvider'
import { category, stateAction, todoList } from '../stateManagement/reducer'
import Todo from './Todo'
import TodoForm from './TodoForm'

interface Props {
  category: { id: number; title: string; todoList: todoList }
}

const Category: React.FunctionComponent<Props> = ({ category }) => {
  const { dispatch } = useCategoryState()

  const deleteSingleCategory = async (category: category) => {
    const wasDeleted = await deleteCategory(category)
    if (wasDeleted) {
      dispatch({ type: stateAction.DELETE_CATEGORY, payload: category })
    }
  }

  return (
    <div className=''>
      <h3>{category.title}</h3>
      <button onClick={() => deleteSingleCategory(category)}>Delete</button>
      <TodoForm parentCategory={category} />
      {category.todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default Category
