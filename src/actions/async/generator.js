
export const typesGenerator = (method, schema) => {
  return [
    `${method.toUpperCase()}_${schema.toUpperCase()}_REQUEST`,
    `${method.toUpperCase()}_${schema.toUpperCase()}_SUCCESS`,
    `${method.toUpperCase()}_${schema.toUpperCase()}_FAILURE`,
  ]
}
