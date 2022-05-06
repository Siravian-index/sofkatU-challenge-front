import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createCategory } from '../service/categoryService'
import { useCategoryState } from '../stateManagement/ContextProvider'
import { stateAction, userInput } from '../types'

interface Props {}

const CategoryForm: React.FunctionComponent<Props> = () => {
  const MIN_LENGTH = 3
  const { dispatch } = useCategoryState()
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<userInput>({ mode: 'onSubmit', reValidateMode: 'onSubmit' })
  const onSubmit: SubmitHandler<userInput> = async (data) => {
    const category = await createCategory(data)
    dispatch({ type: stateAction.ADD_CATEGORY, payload: category })
    reset()
  }

  return (
    <form className='w-full max-w-sm p-2' onSubmit={handleSubmit(onSubmit)}>
      <div className='md:flex md:items-center mb-6' onClick={() => clearErrors()}>
        <div className='md:w-1/3'>
          <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='inline-full-name'>
            New:
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            {...register('title', { required: true, minLength: MIN_LENGTH })}
            placeholder='to-do category'
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
            id='inline-full-name'
            type='text'
          />
          {errors.title?.type === 'required' && <p className='text-gray-500  text-center'>This field is required!</p>}
          {errors.title?.type === 'minLength' && (
            <p className='text-gray-500  text-center'>Category name must be at least {MIN_LENGTH} characters long</p>
          )}
        </div>
      </div>
    </form>
  )
}

export default CategoryForm
