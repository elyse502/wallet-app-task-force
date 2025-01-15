import { useState } from 'react'
import { categories } from '../../services/api'
import { toast } from 'react-toastify'
import Modal from '../UI/Modal'
import CategoryForm from './CategoryForm'

function CategoryList({ categoriesData, onCategoryChange }) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleEdit = (category) => {
    setSelectedCategory(category)
    setShowEditModal(true)
  }

  const handleDelete = async (categoryId) => {
    try {
      await categories.delete(categoryId)
      toast.success('Category deleted successfully')
      onCategoryChange()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting category')
    }
    setShowDeleteConfirm(false)
    setSelectedCategory(null)
  }

  const confirmDelete = (category) => {
    setSelectedCategory(category)
    setShowDeleteConfirm(true)
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {categoriesData.map((category) => (
          <li key={category._id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                  {category.description && (
                    <p className="text-sm text-gray-500">{category.description}</p>
                  )}
                  {category.subcategories?.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-500">Subcategories:</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {category.subcategories.map((sub, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(category)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Category"
      >
        <CategoryForm
          editData={selectedCategory}
          onSuccess={() => {
            setShowEditModal(false)
            onCategoryChange()
          }}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>

      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete this category?</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(selectedCategory._id)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CategoryList 