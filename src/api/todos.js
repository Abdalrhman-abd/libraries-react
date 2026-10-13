
const BASE_URL = 'https://api.ajitdev.com/api/todo'

export const getTodos = async () => {
  const response = await fetch(BASE_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }

  const result = await response.json()
  return result.data
}

export const postTodo = async (newTodo) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  })

  if (!response.ok) {
    throw new Error('Failed to create todo')
  }

  return response.json()
}
