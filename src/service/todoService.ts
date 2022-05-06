import { category, HTTP_METHODS, STATUS, todo, todoWithoutId } from '../types'

const ENDPOINT = 'http://localhost:8080/api/v1/todos'

const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

const errorMessage = 'Something went wrong'

export const createTodo = async (data: todoWithoutId): Promise<category> => {
  try {
    const res = await fetch(ENDPOINT, {
      method: HTTP_METHODS.POST,
      headers: HEADERS,
      body: JSON.stringify(data),
    })
    if (res.status === STATUS.CREATED) {
      const category: category = await res.json()
      return category
    }
    throw new Error(errorMessage)
  } catch (error) {
    throw new Error(`${errorMessage}: ${error}`)
  }
}

export const updateTodo = async (todo: todo): Promise<todo> => {
  try {
    const res = await fetch(ENDPOINT, { method: HTTP_METHODS.PUT, headers: HEADERS, body: JSON.stringify(todo) })
    if (res.status === STATUS.OK) {
      const updatedTodo: todo = await res.json()
      return updatedTodo
    }
    throw new Error(errorMessage)
  } catch (error) {
    throw new Error(`${errorMessage}: ${error}`)
  }
}

export const deleteTodo = async (todo: todo): Promise<boolean> => {
  try {
    const id = todo.id
    const res = await fetch(`${ENDPOINT}/${id}`, { method: HTTP_METHODS.DELETE, headers: HEADERS })
    if (res.status === STATUS.OK) {
      const wasDeleted: boolean = await res.json()
      return wasDeleted
    }
    throw new Error(errorMessage)
  } catch (error) {
    throw new Error(`${errorMessage}: ${error}`)
  }
}
