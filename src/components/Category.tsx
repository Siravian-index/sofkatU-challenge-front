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
    <div className=''>
      <h3>{category.title}</h3>
      <button onClick={() => deleteSingleCategory(category)}>Delete</button>
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
