import {
  schema
} from 'normalizr'

export const validatorSchema = new schema.Entity('validator')

export const validatorsSchema = new schema.Object({
  validators: [validatorSchema]
})