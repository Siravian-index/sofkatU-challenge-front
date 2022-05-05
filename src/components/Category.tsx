import * as React from 'react'
import { todoList } from '../stateManagement/reducer'
import Todo from './Todo'

interface Props {
  category: { id: number; title: string; todoList: todoList }
}

// dispatch actions related with todos

const Category: React.FunctionComponent<Props> = ({ category }) => {
  return (
    <div className='basis-4/5'>
      <h3>{category.title}</h3>
      <button>Delete</button>
      {category.todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default Category
