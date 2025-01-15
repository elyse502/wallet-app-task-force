import { useState } from 'react'
import CategoryForm from '../components/Categories/CategoryForm'

function Categories() {
  const [showForm, setShowForm] = useState(false)
  const [categories, setCategories] = useState([
    { id: 1, name: 'Food & Dining', description: 'Restaurants, groceries, etc.', subcategories: ['Groceries', 'Restaurants', 'Coffee Shops'] },
    { id: 2, name: 'Transportation', description: 'Gas, public transit, etc.', subcategories: ['Gas', 'Public Transit', 'Car Maintenance'] },
    { id: 3, name: 'Utilities', description: 'Bills and services', subcategories: ['Electricity', 'Water', 'Internet'] },
  ])

  const handleAddCategory = (newCategory) => {
    setCategories([
      ...categories,
      {
        id: categories.length + 1,
        ...newCategory
      }
    ])
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Add Category
        </button>
      </div>

      {showForm && (
        <CategoryForm
          onSubmit={handleAddCategory}
          onClose={() => setShowForm(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium">{category.name}</h3>
            <p className="text-gray-500 mt-1">{category.description}</p>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-500">Subcategories:</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {category.subcategories.map((sub, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories 