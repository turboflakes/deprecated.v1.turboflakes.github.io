import {
  CALL_API
} from '../../middlewares/api'
import {
  schemas
} from '../../schemas'

const defineEndpoint = (method, schema, id) => {
  switch (method) {
    case "DELETE":
    case "PUT":
      return `${schema}/${id}`
    case "POST":
      return `${schema}`
    case "GET":
      if (id) {
        return `${schema}/${id}`
      }
      return `${schema}`
    default:
      return `${schema}`
  }
}

export const generalRequest = (method, types, schema, data, headers, queryParams, options) => {

  const endpoint = defineEndpoint(method, schema, data.id)

  var requestOptions = {
    method: method,
    types,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    endpoint,
    queryParams,
    body: data,
    id: data.id
  }

  if (method === "GET") {
    delete requestOptions.body
  }

  if (options) {
    requestOptions = {
      ...requestOptions,
      ...options
    }
  }

  if (requestOptions.headers['Content-Type'] === 'application/json') {
    requestOptions = {
      ...JSON.parse(JSON.stringify(requestOptions)) // delete undefined keys
    }
  }

  requestOptions = {
    ...requestOptions,
    schema: method === "GET" && types[0].startsWith("QUERY") ? schemas[schema.toUpperCase() + "S"] : schemas[schema.toUpperCase()]
  }

  return {
    [CALL_API]: {
      ...requestOptions
    }
  }
}