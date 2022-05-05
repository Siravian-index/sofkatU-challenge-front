import * as React from 'react'
import { getTodos } from '../service/todoService'
import reducer, { actionType, categoryList } from './reducer'

type Props = { children?: React.ReactNode }

type contextType = {
  state: categoryList
  dispatch: React.Dispatch<actionType>
}

const Context = React.createContext<contextType>({} as contextType)
const ContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, [])
  const getStateFromDB = async () => {
    const todoList = await getTodos()
    // dispatch({ type: todoAction.LOAD, payload: todoList })
  }
  React.useEffect(() => {
    getStateFromDB()
  }, [])
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
}

export default ContextProvider

export const useTodoState = () => React.useContext(Context)
