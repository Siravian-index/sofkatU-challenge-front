import * as React from 'react'

interface Props {}

const Message: React.FC<Props> = () => {
  const front = 'https://github.com/Siravian-index/sofkatU-challenge-front'
  const back = 'https://github.com/Siravian-index/sofkatU-challenge-back'
  return (
    <div className='text-gray-500 font-bold text-center'>
      <p>David Esteban Peña Chavez</p>
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

export default Message
