import React from 'react'
import CategoryList from './components/CategoryList'

import Title from './components/Title'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import ContextProvider from './stateManagement/ContextProvider'

function App() {
  return (
    <div className='flex justify-center flex-col items-center'>
      <ContextProvider>
        <CategoryList />
      </ContextProvider>
    </div>
  )
}

export default App
