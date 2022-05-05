import * as React from 'react'
import { deleteTodo } from '../service/todoService'
import { useCategoryState } from '../stateManagement/ContextProvider'
import { stateAction, todo } from '../stateManagement/reducer'

interface Props {
  todo: todo
  // deleteOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, todo: todo): void
  // checkBox(e: React.ChangeEvent<HTMLInputElement>, todo: todo): void
}

const Todo: React.FC<Props> = ({ todo: t }) => {
  const { dispatch } = useCategoryState()
  const updateCheckBox = async () => {}

  const updateTitle = async () => {}

  const deleteSingleTodo = async (todo: todo) => {
    const wasDeleted = await deleteTodo(todo)
    if (wasDeleted) {
      dispatch({ type: stateAction.REMOVE_TODO, payload: todo })
    }
  }
  return (
    <div className={`max-w-sm rounded shadow-xl ${!t.done && 'border-r border-b border-orange-500'}`}>
      <div className={`px-6 py-4 ${t.done && 'line-through decoration-orange-500 decoration-4 '}`}>
        <div className='font-bold text-xl mb-2'>{t.title}</div>
      </div>
      <div className='px-6 pt-4 pb-2'>
        <span className='inline-block  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
          <input
            className='accent-orange-500 w-6 h-6 rounded'
            type='checkbox'
            // checked={t.done}
            // onChange={(e) => checkBox(e, t)}
          />
        </span>
        <span className='inline-block px-3 py-1 text-sm font-semibold  mr-2 mb-2'>
          <button
            className='rounded bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent'
            onClick={(e) => deleteSingleTodo(t)}
          >
            Delete
          </button>
        </span>
      </div>
    </div>
  )
}

export default Todo
