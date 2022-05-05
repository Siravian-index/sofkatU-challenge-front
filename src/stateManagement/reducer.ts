export enum stateAction {
  ADD_CATEGORY = 'ADD_CATEGORY',
  LOAD_CATEGORIES = 'LOAD_CATEGORIES',
  DELETE_CATEGORY = 'DELETE_CATEGORY',
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
}
export type todo = { title: string; id: number; done: boolean; categoryFK: number }
export type todoList = todo[]
export type category = { id: number; title: string; todoList: todoList }
export type categoryList = category[]
export type actionType = { type: stateAction; payload: todo | category | categoryList }

function reducer(state: categoryList, action: actionType): categoryList {
  const { type, payload } = action
  const categoryList = payload as categoryList
  const category = payload as category
  const todo = payload as todo
  switch (type) {
    case stateAction.LOAD_CATEGORIES:
      return categoryList
    case stateAction.ADD_CATEGORY:
      return [...state, category]
    case stateAction.DELETE_CATEGORY:
      return state.filter((c) => c.id !== category.id)
    case stateAction.ADD_TODO:
      const parentCategory = state.find((c) => c.id === todo.categoryFK)
      if (parentCategory) {
        const updatedTodoList = [...parentCategory.todoList, todo]
        return state.map((c) => (c.id === parentCategory.id ? { ...parentCategory, todoList: updatedTodoList } : c))
      }
      return state
    case stateAction.REMOVE_TODO:
      const parent = state.find((c) => c.id === todo.categoryFK)
      if (parent) {
        const updatedList = parent.todoList.filter((t) => t.id !== todo.id)
        return state.map((c) => (c.id === parent.id ? { ...parent, todoList: updatedList } : c))
      }
      return state
    case stateAction.UPDATE_TODO:
      const parentC = state.find((c) => c.id === todo.categoryFK)
      if (parentC) {
        const updatedArray = parentC.todoList.map((t) => (t.id === todo.id ? { ...todo } : t))
        return state.map((c) => (c.id === parentC.id ? { ...parentC, todoList: updatedArray } : c))
      }
      return state
    default:
      throw new Error('Illegal stateAction passed')
  }
}

export default reducer
