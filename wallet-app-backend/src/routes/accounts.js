const express = require('express')
const router = express.Router()
const {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount
} = require('../controllers/accountController')
const { protect } = require('../middleware/auth')

router.use(protect) // Protect all routes

router.route('/')
  .get(getAccounts)
  .post(createAccount)

router.route('/:id')
  .put(updateAccount)
  .delete(deleteAccount)

module.exports = router 