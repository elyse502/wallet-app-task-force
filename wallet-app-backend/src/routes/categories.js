const express = require('express')
const router = express.Router()
const { validate } = require('../middleware/validate')
const { categoryValidationRules } = require('../validators/categoryValidators')
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController')
const { protect } = require('../middleware/auth')

router.use(protect) // Protect all routes

router.route('/')
  .get(getCategories)
  .post(categoryValidationRules, validate, createCategory)

router.route('/:id')
  .put(categoryValidationRules, validate, updateCategory)
  .delete(deleteCategory)

module.exports = router 