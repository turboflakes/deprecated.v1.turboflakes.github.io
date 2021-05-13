export const changeWeight = (index, weight) => ({
  type: `CHANGE_WEIGHT`,
  data: {index, weight}
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