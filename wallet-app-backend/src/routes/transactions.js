const express = require('express')
const router = express.Router()
const Transaction = require('../models/Transaction')
const { validate } = require('../middleware/validate')
const { transactionValidationRules } = require('../validators/transactionValidators')
const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController')
const { protect } = require('../middleware/auth')
const upload = require('../middleware/upload')
const cloudinary = require('../config/cloudinary')

router.use(protect)

router.route('/')
  .get(getTransactions)
  .post(transactionValidationRules, validate, createTransaction)

router.route('/:id')
  .put(transactionValidationRules, validate, updateTransaction)
  .delete(deleteTransaction)

router.post('/upload-receipt/:id', protect, upload.single('receipt'), async (req, res) => {
  try {
    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path)
    
    // Update transaction with receipt URL
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { receiptUrl: result.secure_url },
      { new: true }
    )
    
    res.json(transaction)
  } catch (error) {
    res.status(500).json({ message: 'Error uploading receipt' })
  }
})

module.exports = router 