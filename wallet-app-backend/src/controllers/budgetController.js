const BudgetSetting = require('../models/BudgetSetting')

// @desc    Get budget settings
// @route   GET /api/budget-settings
// @access  Private
const getBudgetSettings = async (req, res) => {
  try {
    let budgetSettings = await BudgetSetting.findOne({ user: req.user._id })
    
    if (!budgetSettings) {
      budgetSettings = await BudgetSetting.create({
        user: req.user._id,
        monthlyLimit: 0,
        categoryLimits: []
      })
    }

    res.json(budgetSettings)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching budget settings' })
  }
}

// @desc    Update budget settings
// @route   POST /api/budget-settings
// @access  Private
const updateBudgetSettings = async (req, res) => {
  try {
    const { monthlyLimit, categoryLimits } = req.body

    const budgetSettings = await BudgetSetting.findOneAndUpdate(
      { user: req.user._id },
      { monthlyLimit, categoryLimits },
      { new: true, upsert: true }
    )

    res.json(budgetSettings)
  } catch (error) {
    res.status(500).json({ message: 'Error updating budget settings' })
  }
}

module.exports = {
  getBudgetSettings,
  updateBudgetSettings
} 