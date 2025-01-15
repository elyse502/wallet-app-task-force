const Transaction = require('../models/Transaction')
const Account = require('../models/Account')
const mongoose = require('mongoose')

// @desc    Get all transactions for a user
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .populate('category', 'name')
      .populate('account', 'name')
      .sort({ date: -1 })
    res.json(transactions)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Create new transaction
// @route   POST /api/transactions
// @access  Private
const createTransaction = async (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const { amount, type, description, date, category, account } = req.body

    // Create transaction
    const transaction = await Transaction.create([{
      amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
      type,
      description,
      date: date || Date.now(),
      category,
      account,
      user: req.user._id
    }], { session })

    // Update account balance
    const updatedAccount = await Account.findByIdAndUpdate(
      account,
      { 
        $inc: { 
          balance: type === 'expense' ? -Math.abs(amount) : Math.abs(amount)
        }
      },
      { new: true, session }
    )

    if (!updatedAccount) {
      throw new Error('Account not found')
    }

    await session.commitTransaction()
    
    res.status(201).json(transaction[0])
  } catch (error) {
    await session.abortTransaction()
    res.status(400).json({ message: error.message })
  } finally {
    session.endSession()
  }
}

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = async (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' })
    }

    // Revert old transaction amount from account
    await Account.findByIdAndUpdate(
      transaction.account,
      { $inc: { balance: -transaction.amount } },
      { session }
    )

    // Update transaction
    const { amount, type, ...updateData } = req.body
    const updatedAmount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount)

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { ...updateData, amount: updatedAmount, type },
      { new: true, session }
    )

    // Update new account balance
    await Account.findByIdAndUpdate(
      updateData.account || transaction.account,
      { $inc: { balance: updatedAmount } },
      { session }
    )

    await session.commitTransaction()
    res.json(updatedTransaction)
  } catch (error) {
    await session.abortTransaction()
    res.status(400).json({ message: error.message })
  } finally {
    session.endSession()
  }
}

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' })
    }

    // Revert transaction amount from account
    await Account.findByIdAndUpdate(
      transaction.account,
      { $inc: { balance: -transaction.amount } },
      { session }
    )

    await Transaction.findByIdAndDelete(req.params.id, { session })

    await session.commitTransaction()
    res.json({ message: 'Transaction removed' })
  } catch (error) {
    await session.abortTransaction()
    res.status(400).json({ message: error.message })
  } finally {
    session.endSession()
  }
}

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
}