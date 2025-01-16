const budgetTemplateSchema = new mongoose.Schema({
  name: String,
  monthlyLimit: Number,
  categoryLimits: [{
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    amount: Number
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}) 