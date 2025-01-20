const Account = require('../models/Account')

// @desc    Get all accounts for a user
// @route   GET /api/accounts
// @access  Private
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user._id })
    res.json(accounts)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Create new account
// @route   POST /api/accounts
// @access  Private
const createAccount = async (req, res) => {
  try {
    const { name, type, balance } = req.body

    const account = await Account.create({
      name,
      type,
      balance,
      user: req.user._id
    })

    res.status(201).json(account)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Update account
// @route   PUT /api/accounts/:id
// @access  Private
const updateAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id)

    if (!account) {
      return res.status(404).json({ message: 'Account not found' })
    }

    // Make sure user owns account
    if (account.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' })
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(updatedAccount)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Delete account
// @route   DELETE /api/accounts/:id
// @access  Private
const deleteAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id)

    if (!account) {
      return res.status(404).json({ message: 'Account not found' })
    }

    // Check if user owns the account
    if (account.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    // Use findByIdAndDelete instead of remove()
    await Account.findByIdAndDelete(req.params.id)

    res.json({ message: 'Account deleted successfully' })
  } catch (error) {
    console.error('Delete account error:', error)
    res.status(500).json({ message: 'Error deleting account' })
  }
}

module.exports = {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount
} 