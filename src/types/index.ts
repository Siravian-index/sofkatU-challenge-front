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

export type todoWithoutId = { title: string; categoryFK: number }
export type categoryWithoutId = { title: string }

export type userInput = { title: string }

export enum HTTP_METHODS {
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum STATUS {
  OK = 200,
  CREATED = 201,
}
