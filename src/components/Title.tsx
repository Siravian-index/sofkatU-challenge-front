import * as React from 'react'
import { useCategoryState } from '../stateManagement/ContextProvider'

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const Title: React.FC<Props> = ({ setShow }) => {
  const ZERO_TODOS = 0
  const SINGULAR = 1
  const { state: categoryList } = useCategoryState()
  const [pendingTodos, setPendingTodos] = React.useState(0)
  const title = pendingTodos > SINGULAR ? 'Todos' : 'Todo'
  React.useEffect(() => {
    setPendingTodos(categoryList.flatMap((c) => c.todoList).reduce((c, t) => (!t.done ? ++c : c), 0))
  }, [categoryList])

  return (
    <>
      <h1
        className='mt-2 text-4xl font-bold leading-normal mb-2 text-orange-500 hover:text-orange-400 hover:underline cursor-pointer'
        onClick={() => setShow((prev) => !prev)}
      >
        {pendingTodos > ZERO_TODOS ? `${title} left: ${pendingTodos}` : `${title} App`}
      </h1>
    </>
  )
}

export default Title
