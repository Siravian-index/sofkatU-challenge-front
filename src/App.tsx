import React from 'react'
import CategoryForm from './components/CategoryForm'
import CategoryList from './components/CategoryList'
import Message from './components/Message'

import Title from './components/Title'
import ContextProvider from './stateManagement/ContextProvider'

function App() {
  const [show, setShow] = React.useState(true)
  return (
    <div className='flex justify-center flex-col items-center'>
      <ContextProvider>
        <Title setShow={setShow} />
        <CategoryForm />
        {show && <CategoryList />}
      </ContextProvider>
      {!show && <Message />}
    </div>
  )
}

export default App
