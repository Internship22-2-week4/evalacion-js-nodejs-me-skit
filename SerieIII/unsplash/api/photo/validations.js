import { check } from 'express-validator'

export const photoValidations = [
  check('title')
    .notEmpty()
    .withMessage('Title is required'),
  check('date')
    .optional(),
  check('uri')
    .notEmpty()
    .withMessage('URI is required'),
  check('userId')
    .notEmpty()
    .withMessage('User ID should not be empty')
]
