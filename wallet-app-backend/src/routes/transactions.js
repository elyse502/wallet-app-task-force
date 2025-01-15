const express = require('express')
const router = express.Router()
const { validate } = require('../middleware/validate')
const { transactionValidationRules } = require('../validators/transactionValidators')
const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController')
const { protect } = require('../middleware/auth')

router.use(protect)

router.route('/')
  .get(getTransactions)
  .post(transactionValidationRules, validate, createTransaction)

router.route('/:id')
  .put(transactionValidationRules, validate, updateTransaction)
  .delete(deleteTransaction)

module.exports = router 