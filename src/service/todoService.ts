import { category, HTTP_METHODS, todo, todoWithoutId } from '../types'

const ENDPOINT = 'http://localhost:8080/api/v1/todos'

const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export const createTodo = async (data: todoWithoutId): Promise<category> => {
  const res = await fetch(ENDPOINT, {
    method: HTTP_METHODS.POST,
    headers: HEADERS,
    body: JSON.stringify(data),
  })
  const category: category = await res.json()
  return category
}

export const updateTodo = async (todo: todo): Promise<todo> => {
  const todoJSON = JSON.stringify(todo)
  const res = await fetch(ENDPOINT, { method: HTTP_METHODS.PUT, headers: HEADERS, body: todoJSON })
  const updatedTodo: todo = await res.json()
  return updatedTodo
}

export const deleteTodo = async (todo: todo): Promise<boolean> => {
  const id = todo.id
  const res = await fetch(`${ENDPOINT}/${id}`, { method: HTTP_METHODS.DELETE, headers: HEADERS })
  const wasDeleted: boolean = await res.json()
  return wasDeleted
}
