import { useState, useEffect } from 'react'
import { categories } from '../services/api'
import CategoryList from '../components/Categories/CategoryList'
import CategoryForm from '../components/Categories/CategoryForm'
import Modal from '../components/UI/Modal'
import PageLoader from '../components/UI/PageLoader'

function Categories() {
  const [categoriesData, setCategoriesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  const fetchCategories = async () => {
    try {
      const response = await categories.getAll()
      setCategoriesData(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="mt-2 text-sm text-gray-700">
            Organize your transactions with custom categories
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {categoriesData.map((category) => (
          <div key={category._id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                  {category.description && (
                    <p className="mt-1 text-sm text-gray-500">{category.description}</p>
                  )}
                </div>
              </div>
              {category.subcategories?.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Subcategories:</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
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
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => handleEdit(category)}
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(category)}
                  className="text-sm text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Category"
      >
        <CategoryForm
          onSuccess={() => {
            setShowAddModal(false)
            fetchCategories()
          }}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  )
}

export default Categories 