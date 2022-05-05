import * as React from 'react'
import { deleteTodo, updateTodo } from '../service/todoService'
import { useCategoryState } from '../stateManagement/ContextProvider'
import { stateAction, todo } from '../types'
import { capitalizeFirstLetterOf } from '../utils'

interface Props {
  todo: todo
  setTodoToUpdate: React.Dispatch<React.SetStateAction<todo>>
}

const Todo: React.FC<Props> = ({ todo: t, setTodoToUpdate }) => {
  const { dispatch } = useCategoryState()
  const updateCheckBox = async (e: React.ChangeEvent<HTMLInputElement>, flipTodoCheck: todo) => {
    const flippedCheck: todo = await updateTodo({ ...flipTodoCheck, done: !flipTodoCheck.done })
    if (flipTodoCheck) {
      dispatch({ type: stateAction.UPDATE_TODO, payload: flippedCheck })
    }
  }

  const deleteSingleTodo = async (todo: todo) => {
    const wasDeleted = await deleteTodo(todo)
    if (wasDeleted) {
      dispatch({ type: stateAction.REMOVE_TODO, payload: todo })
    }
  }
  return (
    <div className={`max-w-sm rounded shadow-xl ${!t.done && 'border-r border-b border-orange-500'}`}>
      <div className={`px-6 py-4 ${t.done && 'line-through decoration-orange-500 decoration-4 '}`}>
        <div className='font-bold text-xl'>{capitalizeFirstLetterOf(t.title)}</div>
      </div>
      <div className='px-6 pb-2'>
        <span className='inline-block  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
          <input
            className='accent-orange-500 w-6 h-6 rounded'
            type='checkbox'
            checked={t.done}
            onChange={(e) => updateCheckBox(e, t)}
          />
        </span>
        <span className='inline-block px-3 py-1 text-sm font-semibold  mr-2 mb-2'>
          <button
            className={`rounded py-2 px-4 ${
              t.done
                ? 'text-white bg-gray-300 rounded focus:outline-none'
                : 'bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white border border-gray-500 hover:border-transparent'
            }  `}
            onClick={(e) => {
              console.log('todo to update', t)
              setTodoToUpdate(t)
            }}
            disabled={t.done}
          >
            Edit
          </button>
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
