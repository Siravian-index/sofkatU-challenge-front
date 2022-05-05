import * as React from 'react'

interface Props {}

const CategoryForm: React.FunctionComponent<Props> = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {}
  return (
    <form className='w-full max-w-sm p-2' onSubmit={(e) => onSubmit(e)}>
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-1/3'>
          <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='inline-full-name'>
            New:
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            placeholder='to-do category'
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
            id='inline-full-name'
            type='text'
          />
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

export default CategoryForm
