import * as React from 'react'

interface Props {}

const EmptyTodos: React.FC<Props> = () => {
  const front = 'https://github.com/Siravian-index/todo-react-ts'
  const back = 'https://github.com/Siravian-index/todo-api'
  return (
    <div className='text-gray-500 font-bold text-center'>
      <p>No todos yet</p>
      <p className='text-xs mt-7 hover:before:content-["<"] hover:after:content-["/>"] hover:text-orange-400 hover:font-mono'>
        Built with{' '}
        <span className='hover:text-blue-400 hover:underline cursor-pointer'>
          <a href={front} target='_blank'>
            love
          </a>
        </span>{' '}
        &&{' '}
        <span className='hover:text-green-400 hover:underline cursor-pointer'>
          <a href={back} target='_blank'>
            coffee
          </a>
        </span>
      </p>
    </div>
  )
}

export default EmptyTodos
