const Category = require('../models/Category')

// @desc    Get all categories for a user
// @route   GET /api/categories
// @access  Private
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id })
    res.json(categories)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Create new category
// @route   POST /api/categories
// @access  Private
const createCategory = async (req, res) => {
  try {
    const { name, description, subcategories } = req.body

    const category = await Category.create({
      name,
      description,
      subcategories: subcategories || [],
      user: req.user._id
    })

    res.status(201).json(category)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)

    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }

    // Make sure user owns category
    if (category.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' })
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(updatedCategory)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)

    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }

    // Make sure user owns category
    if (category.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' })
    }

    await Category.findByIdAndDelete(req.params.id)

    res.json({ message: 'Category removed' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} 