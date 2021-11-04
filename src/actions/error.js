export const remove = (id) => ({
  type: 'REMOVE_ERROR',
  id
})

export const add = (error) => ({
  type: 'ADD_ERROR',
  error
})

export const clearALL = () => ({
  type: "CLEAR_ERROR_MESSAGES"
})