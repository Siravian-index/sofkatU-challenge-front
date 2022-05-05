import * as React from 'react'
import { useTodoState } from '../stateManagement/ContextProvider'

interface Props {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

const Title: React.FC<Props> = ({ setShowForm }) => {
  const ZERO_TODOS = 0
  const SINGULAR = 1
  const { state: todoList } = useTodoState()
  const [pendingTodos, setPendingTodos] = React.useState(0)
  const title = pendingTodos > SINGULAR ? 'Todos' : 'Todo'
  React.useEffect(() => {
    setPendingTodos(todoList.reduce((c, t) => (!t.isDone ? ++c : c), 0))
  }, [todoList])

  return (
    <>
      <h1
        className='mt-2 text-4xl font-bold leading-normal mb-2 text-orange-500 hover:text-orange-400 hover:underline cursor-pointer'
        onClick={() => setShowForm((prev) => !prev)}
      >
        {pendingTodos > ZERO_TODOS ? `${title} left: ${pendingTodos}` : `${title} App`}
      </h1>
    </>
  )
}

export default Title
