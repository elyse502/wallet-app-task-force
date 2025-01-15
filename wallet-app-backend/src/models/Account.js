const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add account name']
  },
  type: {
    type: String,
    required: [true, 'Please specify account type'],
    enum: ['bank', 'cash', 'mobile']
  },
  balance: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Account', accountSchema) 