export enum todoAction {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  UPDATE = 'UPDATE',
  LOAD = 'LOAD',
}
export type todo = { title: string; message: string; id: string; isDone: boolean }
export type todoList = todo[]
export type actionType = { type: todoAction; payload: todo | todoList }

function reducer(state: todoList, action: actionType): todoList {
  const { type, payload } = action
  const todo = payload as todo
  const todoList = payload as todoList
  switch (type) {
    case todoAction.ADD:
      return [...state, todo]
    case todoAction.REMOVE:
      return state.filter((t) => t.id !== todo.id)
    case todoAction.UPDATE:
      return state.map((t) => (t.id === todo.id ? todo : t))
    case todoAction.LOAD:
      return todoList
    default:
      throw new Error('Illegal todoAction passed')
  }
}

export default reducer
