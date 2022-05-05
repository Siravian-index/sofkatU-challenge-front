import * as React from 'react'
import { updateTodo } from '../service/todoService'
import { useCategoryState } from '../stateManagement/ContextProvider'
import { stateAction, todo } from '../types'

interface Props {
  todoToUpdate: todo
  setTodoToUpdate: React.Dispatch<React.SetStateAction<todo>>
}

const UpdateTodoForm: React.FunctionComponent<Props> = ({ todoToUpdate, setTodoToUpdate }) => {
  const MIN_LENGTH = 3
  const ERROR_TIMER = 3500
  const [error, setError] = React.useState(false)
  const { dispatch } = useCategoryState()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>, todoWillUpdate: todo) => {
    e.preventDefault()
    if (todoWillUpdate.title.length > MIN_LENGTH) {
      setError(false)
      const updated: todo = await updateTodo(todoWillUpdate)
      if (updated.categoryFK) {
        dispatch({ type: stateAction.UPDATE_TODO, payload: updated })
        setTodoToUpdate({} as todo)
      }
    } else {
      setError(true)
    }
  }

  React.useEffect(() => {
    let m = true
    let id = 0
    if (m) {
      id = setTimeout(() => {
        setError(false)
      }, ERROR_TIMER)
    }
    return () => {
      m = false
      clearTimeout(id)
    }
  }, [error])

  return (
    <form className='w-full max-w-sm p-2' onSubmit={(e) => onSubmit(e, todoToUpdate)}>
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-1/3'>
          <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='inline-full-name'>
            To-do:
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            value={todoToUpdate.title}
            onChange={(e) => setTodoToUpdate({ ...todoToUpdate, title: e.target.value })}
            placeholder='update title'
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
            id='inline-full-name'
            type='text'
          />
          {error && (
            <p className='text-gray-500  text-center'>To-do name must be at least {MIN_LENGTH} characters long</p>
          )}
        </div>
      </div>
      <div className='flex md:items-center'>
        <div className='w-2/3 md:w-1/3'></div>
        <div className='w-1/3 md:w-2/3'>
          <button
            className='shadow bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
            type='submit'
          >
            Update
          </button>
        </div>
      </div>
    </form>
  )
}

export default UpdateTodoForm
