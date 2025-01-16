const { body } = require('express-validator')

const transactionValidationRules = [
  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isNumeric()
    .withMessage('Amount must be a number'),
  body('type')
    .notEmpty()
    .withMessage('Transaction type is required')
    .isIn(['income', 'expense'])
    .withMessage('Transaction type must be either income or expense'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Description must be at least 3 characters long'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isMongoId()
    .withMessage('Invalid category ID'),
  body('account')
    .notEmpty()
    .withMessage('Account is required')
    .isMongoId()
    .withMessage('Invalid account ID'),
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be greater than 0'),
  body('date')
    .isISO8601()
    .withMessage('Invalid date format')
]

module.exports = {
  transactionValidationRules
} 