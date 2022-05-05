import React from 'react'

import Title from './components/Title'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import ContextProvider from './stateManagement/ContextProvider'

function App() {
  return (
    <div className='flex justify-center flex-col items-center'>
      <ContextProvider></ContextProvider>
    </div>
  )
}

export default App
