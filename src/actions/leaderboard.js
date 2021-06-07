export const changeWeight = (index, weight) => ({
  type: `CHANGE_WEIGHT`,
  data: {index, weight}
})

export const changeRange = (index, range) => ({
  type: `CHANGE_RANGE`,
  data: {index, range}
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