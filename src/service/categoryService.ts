import { category, categoryList, todo, todoList } from './../stateManagement/reducer'

const ENDPOINT = 'http://localhost:8080/api/v1/categories'

enum HTTP_METHODS {
  POST = 'POST',
  DELETE = 'DELETE',
}

const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

type categoryWithoutId = { title: string; todoList: todoList }

export const getCategories = async (): Promise<categoryList> => {
  try {
    const res = await fetch(ENDPOINT)
    const data: categoryList = await res.json()
    return data
  } catch (err) {
    throw new Error(`Couldn't fetched ${err}`)
  }
}

export const createCategory = async (data: categoryWithoutId): Promise<categoryList> => {
  const res = await fetch(ENDPOINT, {
    method: HTTP_METHODS.POST,
    headers: HEADERS,
    body: JSON.stringify(data),
  })
  const categories: categoryList = await res.json()
  return categories
}

export const deleteCategory = async (category: category): Promise<boolean> => {
  const id = category.id
  const res = await fetch(`${ENDPOINT}/${id}`, { method: HTTP_METHODS.DELETE, headers: HEADERS })
  const wasDeleted: boolean = await res.json()
  return wasDeleted
}
