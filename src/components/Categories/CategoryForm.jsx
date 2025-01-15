import { useState } from 'react'

function CategoryForm({ onSubmit, onClose }) {
  const [category, setCategory] = useState({
    name: '',
    description: '',
    subcategories: ['']
  })

  const addSubcategory = () => {
    setCategory({
      ...category,
      subcategories: [...category.subcategories, '']
    })
  }

  const updateSubcategory = (index, value) => {
    const newSubcategories = [...category.subcategories]
    newSubcategories[index] = value
    setCategory({
      ...category,
      subcategories: newSubcategories
    })
  }

  const removeSubcategory = (index) => {
    setCategory({
      ...category,
      subcategories: category.subcategories.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...category,
      subcategories: category.subcategories.filter(sub => sub.trim() !== '')
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Add Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              value={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={category.description}
              onChange={(e) => setCategory({ ...category, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subcategories</label>
            {category.subcategories.map((subcategory, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={subcategory}
                  onChange={(e) => updateSubcategory(index, e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter subcategory"
                />
                <button
                  type="button"
                  onClick={() => removeSubcategory(index)}
                  className="px-2 py-1 text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSubcategory}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
            >
              + Add Subcategory
            </button>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoryForm 