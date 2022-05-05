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
      const parentCategory = state.find((c) => c.id === todo.categoryFK)
      console.log('fresh todo', todo)

      if (parentCategory) {
        const updatedTodoList = [...parentCategory.todoList, todo]
        return state.map((c) => (c.id === parentCategory.id ? { ...parentCategory, todoList: updatedTodoList } : c))
      }
      console.log('should not hit this line')
      return state
    case stateAction.REMOVE_TODO:
      const parent = state.find((c) => c.id === todo.categoryFK)
      console.log('removing todo', todo)
      if (parent) {
        const updatedList = parent.todoList.filter((t) => t.id !== todo.id)
        return state.map((c) => (c.id === parent.id ? { ...parent, todoList: updatedList } : c))
      }
      console.log('should not hit this line')
      return state
    case stateAction.UPDATE_TODO:
      const parentC = state.find((c) => c.id === todo.categoryFK)
      if (parentC) {
        const updatedArray = parentC.todoList.map((t) => (t.id === todo.id ? { ...todo } : t))
        return state.map((c) => (c.id === parentC.id ? { ...parentC, todoList: updatedArray } : c))
      }
      console.log('should not hit this line')
      return state
    default:
      throw new Error('Illegal stateAction passed')
  }
}

export default reducer
