import React from 'react'

import Title from './components/Title'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import ContextProvider from './stateManagement/ContextProvider'

function App() {
  const [showForm, setShowForm] = React.useState(true)

  return (
    <div className='flex justify-center flex-col items-center'>
      <ContextProvider>
        <Title setShowForm={setShowForm} />
        {showForm && <TodoForm />}
        <TodoList />
      </ContextProvider>
    </div>
  )
}

export default App
