// ENTITIES
export const getEntity = (state, entityType) => state.entities[entityType] || {}

export const getObjectByEntityAndId = (state, entityType, id) => ({
  ...getEntity(state, entityType)[id]
}) || {}

export const getObjectsByEntityAndIds = (state, entityType, ids) => (Array.isArray(ids) && ids.length > 0) ?
  ids.map(id => getObjectByEntityAndId(state, entityType, id)) :
  []

export const getObjectsByEntityAndQuery = (state, entityType, query, key) => getIdsByEntityAndQuery(state, entityType, query, key).map(id => getEntity(state, entityType)[id])

export const getArrayFromEntity = (state, entityType, entityId, arrayName) => {
  const result = getObjectByEntityAndId(state, entityType, entityId)[arrayName]

  if (Array.isArray(result)) {
    return result
  }

  return []
}

// FETCHERS
export const isFetching = (state) => !!state.fetchers.async
export const isSchemaFetching = (state, schema) => !!state.fetchers.schemas[schema]
export const isIdFetching = (state, id) => !!state.fetchers.ids[id]

// COLLECTIONS
const getCollection = (state, entityType) => state.collections[entityType] || {}
const getCollectionByEntity = (state, entityType) => getCollection(state, entityType) || {}

export const getArrayFromQuery = (state, entityType, query, key) => getIdsByEntityAndQuery(state, entityType, query, key)

export const getIdsByEntityAndQuery = (state, entityType, query, key) => getCollectionByEntity(state, entityType)[query] ?
  (Array.isArray(getCollectionByEntity(state, entityType)[query][key]) ? getCollectionByEntity(state, entityType)[query][key] : []) :
  []

export const getIdsByEntityAndLastQuery = (state, entityType, key) => getCollectionByEntity(state, entityType)["last"] && getCollectionByEntity(state, entityType)[getCollectionByEntity(state, entityType)["last"]] ?
  (Array.isArray(getCollectionByEntity(state, entityType)[getCollectionByEntity(state, entityType)["last"]][key]) ? getCollectionByEntity(state, entityType)[getCollectionByEntity(state, entityType)["last"]][key] : []) :
  []


// API
export const getApiHost = (state) => getObjectByEntityAndId(state, 'api', 'v1').host
export const getApiVersion = (state) => getObjectByEntityAndId(state, 'api', 'v1').version
export const getApiNetworkDetails = (state) => getObjectByEntityAndId(state, 'api', 'v1').network || {}
export const getApiCacheDetails = (state) => getObjectByEntityAndId(state, 'api', 'v1').cache || {}