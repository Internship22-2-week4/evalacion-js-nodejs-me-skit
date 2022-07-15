import { check } from 'express-validator'

export const labelValidations = [
  check('name')
    .notEmpty()
    .withMessage('Label name is required')
]
