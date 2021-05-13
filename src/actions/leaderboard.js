export const changeWeight = (type, weight) => ({
  type: `CHANGE_${type.toUpperCase()}_WEIGHT`,
  weight
})

export const changeQuantity = (value) => ({
  type: `CHANGE_QUANTITY`,
  value
})

export const selectAddress = (address) => ({
  type: `SELECT_ADDRESS`,
  address
})

export const clearAddress = () => ({
  type: `CLEAR_ADDRESS`
})