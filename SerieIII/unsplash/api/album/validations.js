import { check } from 'express-validator'

export const albumValidations = [
  check('name')
    .notEmpty()
    .withMessage('Album name is required'),
  check('userId')
    .notEmpty()
    .withMessage('User ID is required')
]
