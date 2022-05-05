import { actionType, category, categoryList, stateAction, todo } from '../types'

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
      return state.map((c) => (c.id === category.id ? { ...category } : c))
    case stateAction.REMOVE_TODO:
      const parent = state.find((c) => c.id === todo.categoryFK)
      if (parent) {
        const updatedList = parent.todoList.filter((t) => t.id !== todo.id)
        return state.map((c) => (c.id === parent.id ? { ...parent, todoList: updatedList } : c))
      }
      return state
    case stateAction.UPDATE_TODO:
      const parentCategory = state.find((c) => c.id === todo.categoryFK)
      if (parentCategory) {
        const updatedArray = parentCategory.todoList.map((t) => (t.id === todo.id ? { ...todo } : t))
        return state.map((c) => (c.id === parentCategory.id ? { ...parentCategory, todoList: updatedArray } : c))
      }
      return state
    default:
      throw new Error('Illegal stateAction passed')
  }
}

export default reducer
