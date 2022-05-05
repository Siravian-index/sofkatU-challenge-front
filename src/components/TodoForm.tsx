import * as React from 'react'

import { stateAction, todo, todoList } from '../stateManagement/reducer'
import { createTodo } from '../service/todoService'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCategoryState } from '../stateManagement/ContextProvider'

interface Props {
  parentCategory: { id: number; title: string; todoList: todoList }
}
type userInput = { title: string }

const TodoForm: React.FC<Props> = ({ parentCategory }) => {
  const MIN_LENGTH = 3
  const { dispatch } = useCategoryState()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userInput>()
  const onSubmit: SubmitHandler<userInput> = async (data) => {
    //   {
    //     "title": "cook chicken",
    //     "done": true,
    //     "categoryFK": 6
    // }
    // make it return the whole new category instead?
    const todo = await createTodo({ title: data.title, categoryFK: parentCategory.id })
    dispatch({ type: stateAction.ADD_TODO, payload: todo })
  }

  return (
    <form className='w-full max-w-sm p-2' onSubmit={handleSubmit(onSubmit)}>
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-1/3'>
          <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='inline-full-name'>
            Title:
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            {...register('title', { required: true, minLength: MIN_LENGTH })}
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
            id='inline-full-name'
            type='text'
          />
          {errors.title?.type === 'required' && <p>This field is required</p>}
          {errors.title?.type === 'minLength' && <p>To-do name must be at least {MIN_LENGTH} characters long</p>}
        </div>
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
