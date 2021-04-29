export const remove = (index) => ({
  type: 'REMOVE_ERROR',
  index
})

export const add = (error) => ({
  type: 'ADD_ERROR',
  error
})

export const clearALL = () => ({
  type: "CLEAR_ERROR_MESSAGES"
})
