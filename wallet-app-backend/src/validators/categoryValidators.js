const { body } = require('express-validator')

const categoryValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 2 })
    .withMessage('Category name must be at least 2 characters long'),
  body('description')
    .optional()
    .trim(),
  body('subcategories')
    .optional()
    .isArray()
    .withMessage('Subcategories must be an array')
]

module.exports = {
  categoryValidationRules
} 