export const weight = (type, weight) => ({
  type: `CHANGE_${type.toUpperCase()}_WEIGHT`,
  weight
})

export const quantity = (value) => ({
  type: `CHANGE_QUANTITY`,
  value
})