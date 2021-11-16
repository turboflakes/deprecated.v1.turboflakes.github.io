export const remove = (id) => ({
  type: 'REMOVE_NOTIFICATION',
  id
})

export const error = (msg, url = undefined) => ({
  type: 'ADD_NOTIFICATION_ERROR',
  notification: {msg, url, severity: "error"},
})

export const info = (msg, url = undefined) => ({
  type: 'ADD_NOTIFICATION_INFO',
  notification: {msg, url, severity: "info"},
})

export const success = (msg, url = undefined) => ({
  type: 'ADD_NOTIFICATION_SUCCESS',
  notification: {msg, url, severity: "success"},
})

export const clearALL = () => ({
  type: "CLEAR_NOTIFICATIONS"
})