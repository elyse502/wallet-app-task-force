const express = require('express')
const router = express.Router()
const { getBudgetSettings, updateBudgetSettings } = require('../controllers/budgetController')
const { protect } = require('../middleware/auth')

router.route('/')
  .get(protect, getBudgetSettings)
  .post(protect, updateBudgetSettings)

module.exports = router 