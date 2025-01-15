import { useState } from 'react'
import { categories } from '../../services/api'
import { toast } from 'react-toastify'

function CategoryForm({ onSuccess, editData = null, onCancel }) {
  const [formData, setFormData] = useState({
    name: editData?.name || '',
    description: editData?.description || '',
    subcategories: editData?.subcategories || []
  })

  const [newSubcategory, setNewSubcategory] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editData) {
        await categories.update(editData._id, formData)
        toast.success('Category updated successfully')
      } else {
        await categories.create(formData)
        toast.success('Category created successfully')
      }
      onSuccess()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving category')
    }
  }

  const addSubcategory = () => {
    if (newSubcategory.trim()) {
      setFormData({
        ...formData,
        subcategories: [...formData.subcategories, newSubcategory.trim()]
      })
      setNewSubcategory('')
    }
  }

  const removeSubcategory = (index) => {
    setFormData({
      ...formData,
      subcategories: formData.subcategories.filter((_, i) => i !== index)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Category Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          rows="3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Subcategories</label>
        <div className="mt-1 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Add subcategory"
            />
            <button
              type="button"
              onClick={addSubcategory}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
          <ul className="space-y-2">
            {formData.subcategories.map((subcategory, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-md"
              >
                <span>{subcategory}</span>
                <button
                  type="button"
                  onClick={() => removeSubcategory(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          {editData ? 'Update' : 'Create'} Category
        </button>
      </div>
    </form>
  )
}

export default CategoryForm 