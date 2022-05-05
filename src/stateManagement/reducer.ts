export enum stateAction {
  ADD_CATEGORY = 'ADD_CATEGORY',
  LOAD_CATEGORIES = 'LOAD_CATEGORIES',
  DELETE_CATEGORY = 'DELETE_CATEGORY',
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
}
export type todo = { title: string; id: number; isDone: boolean }
export type todoList = todo[]
export type category = { id: number; title: string; todoList: todoList }
export type categoryList = category[]
export type actionType = { type: stateAction; payload: todo | category | categoryList }

function reducer(state: categoryList, action: actionType): categoryList {
  const { type, payload } = action
  const categoryList = payload as categoryList
  switch (type) {
    case stateAction.LOAD_CATEGORIES:
      return categoryList
    case stateAction.ADD_CATEGORY:
      return state
    case stateAction.DELETE_CATEGORY:
      return state
    case stateAction.ADD_TODO:
      return state
    case stateAction.REMOVE_TODO:
      return state
    case stateAction.UPDATE_TODO:
      return state
    default:
      throw new Error('Illegal stateAction passed')
  }
}

export default reducer
