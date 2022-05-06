import * as React from 'react'

import { createTodo } from '../service/todoService'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCategoryState } from '../stateManagement/ContextProvider'
import { stateAction, todoList, userInput } from '../types'

interface Props {
  parentCategory: { id: number; title: string; todoList: todoList }
}

const TodoForm: React.FC<Props> = ({ parentCategory }) => {
  const MIN_LENGTH = 3
  const { dispatch } = useCategoryState()
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<userInput>({ mode: 'onSubmit', reValidateMode: 'onSubmit' })
  const onSubmit: SubmitHandler<userInput> = async (data: userInput) => {
    const todo = await createTodo({ title: data.title, categoryFK: parentCategory.id })
    dispatch({ type: stateAction.ADD_TODO, payload: todo })
    reset()
  }

  return (
    <form className='w-full max-w-sm p-2' onSubmit={handleSubmit(onSubmit)}>
      <div className='md:flex md:items-center mb-6' onClick={() => clearErrors()}>
        <div className='md:w-1/3'>
          <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='inline-full-name'>
            To-do:
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            placeholder='to-do title'
            {...register('title', { required: true, minLength: MIN_LENGTH })}
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
            id='inline-full-name'
            type='text'
          />
          {errors.title?.type === 'required' && <p className='text-gray-500  text-center'>This field is required!</p>}
          {errors.title?.type === 'minLength' && (
            <p className='text-gray-500  text-center'>To-do name must be at least {MIN_LENGTH} characters long</p>
          )}
        </div>
      </div>
    </form>
  )
}

export default TodoForm
