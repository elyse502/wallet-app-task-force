const mongoose = require('mongoose')

const budgetSettingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  monthlyLimit: {
    type: Number,
    default: 0
  },
  categoryLimits: [{
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    limit: {
      type: Number,
      default: 0
    }
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('BudgetSetting', budgetSettingSchema) 