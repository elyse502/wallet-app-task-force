const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please add amount']
  },
  type: {
    type: String,
    required: [true, 'Please specify transaction type'],
    enum: ['income', 'expense']
  },
  description: {
    type: String,
    required: [true, 'Please add description']
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Transaction', transactionSchema) 