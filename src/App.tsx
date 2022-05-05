import React from 'react'
import CategoryForm from './components/CategoryForm'
import CategoryList from './components/CategoryList'

import Title from './components/Title'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import ContextProvider from './stateManagement/ContextProvider'

function App() {
  return (
    <div className=''>
      <ContextProvider>
        <CategoryForm />
        <CategoryList />
      </ContextProvider>
    </div>
  )
}

export default App
