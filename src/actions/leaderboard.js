export const changeWeight = (type, weight) => ({
  type: `CHANGE_${type.toUpperCase()}_WEIGHT`,
  weight
})

export const changeQuantity = (value) => ({
  type: `CHANGE_QUANTITY`,
  value
})

export const selectAccount = (id) => ({
  type: `SELECT_ACCOUNT`,
  id
})

export const clearAccount = () => ({
  type: `CLEAR_ACCOUNT`
})