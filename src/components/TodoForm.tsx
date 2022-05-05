import * as React from 'react'

import { useTodoState } from '../stateManagement/ContextProvider'
import { todo, todoAction } from '../stateManagement/reducer'
import { createTodo } from '../service/todoService'

type userInputType = { title: string; message: string; isDone: boolean }

const TodoForm: React.FC = () => {
  const [{ title, message, isDone }, setUserInput] = React.useState<userInputType>({
    title: '',
    message: '',
    isDone: false,
  })
  const { dispatch } = useTodoState()

  const handleCheck = () => {
    setUserInput({ title, message, isDone: !isDone })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (title && message) {
      const savedTodo: todo = await createTodo({ title, message, isDone })
      dispatch({ type: todoAction.ADD, payload: savedTodo })
      setUserInput({ title: '', message: '', isDone: false })
    }
  }

  return (
    <form className='w-full max-w-sm p-2' onSubmit={(e) => onSubmit(e)}>
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-1/3'>
          <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='inline-full-name'>
            Title:
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
            id='inline-full-name'
            type='text'
            onChange={(e) => setUserInput({ message, isDone, title: e.target.value })}
            value={title}
          />
        </div>
      </div>
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-1/3'>
          <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='inline-password'>
            Message
          </label>
        </div>
        <div className='md:w-2/3'>
          <textarea
            className='max-h-20 resize-none bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
            id='inline-full-name'
            onChange={(e) => setUserInput({ title, isDone, message: e.target.value })}
            value={message}
          />
        </div>
      </div>
      <div className='flex justify-center md:items-center mb-6'>
        <div className='md:w-1/3'></div>
        <label className='md:w-2/3  text-gray-500 font-bold flex justify-evenly  cursor-pointer'>
          <span className='text-sm'>Is it done?</span>
          <input
            className='ml-4 leading-tight accent-orange-500 w-6 h-6 rounded  cursor-pointer'
            type='checkbox'
            checked={isDone}
            onChange={() => handleCheck()}
          />
        </label>
      </div>
      <div className='flex md:items-center'>
        <div className='w-2/3 md:w-1/3'></div>
        <div className='w-1/3 md:w-2/3'>
          <button
            className='shadow bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
            type='submit'
          >
            Add
          </button>
        </div>
      </div>
    </form>
  )
}

export default TodoForm
