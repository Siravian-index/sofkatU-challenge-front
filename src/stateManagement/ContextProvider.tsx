import * as React from 'react'
import { getCategories } from '../service/categoryService'
import { actionType, categoryList, stateAction } from '../types'
import reducer from './reducer'

type Props = { children?: React.ReactNode }

type contextType = {
  state: categoryList
  dispatch: React.Dispatch<actionType>
}

const Context = React.createContext<contextType>({} as contextType)
const ContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, [])
  const getStateFromDB = async () => {
    const categoriesList = await getCategories()
    console.log(categoriesList)

    dispatch({ type: stateAction.LOAD_CATEGORIES, payload: categoriesList })
  }
  React.useEffect(() => {
    getStateFromDB()
  }, [])
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
}

export default ContextProvider

export const useCategoryState = () => React.useContext(Context)
