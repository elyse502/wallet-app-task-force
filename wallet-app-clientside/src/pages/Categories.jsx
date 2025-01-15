import { useState, useEffect } from 'react'
import { categories } from '../services/api'
import CategoryList from '../components/Categories/CategoryList'
import CategoryForm from '../components/Categories/CategoryForm'
import Modal from '../components/UI/Modal'

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
    return <div>Loading categories...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Category
        </button>
      </div>

      <CategoryList categoriesData={categoriesData} onCategoryChange={fetchCategories} />

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