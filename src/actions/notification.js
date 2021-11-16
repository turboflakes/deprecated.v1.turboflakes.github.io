export const remove = (id) => ({
  type: 'REMOVE_NOTIFICATION',
  id
})

export const error = (error) => ({
  type: 'ADD_NOTIFICATION_ERROR',
  error
})

export const info = (msg) => ({
  type: 'ADD_NOTIFICATION_INFO',
  msg
})

export const clearALL = () => ({
  type: "CLEAR_NOTIFICATIONS"
})