import { useState, useEffect } from 'react'
import { categories, budgetSettings } from '../../services/api'
import { toast } from 'react-toastify'
import PageLoader from '../UI/PageLoader'

function BudgetSettings() {
  const [budgetData, setBudgetData] = useState({
    monthlyLimit: 0,
    categoryLimits: []
  })
  const [availableCategories, setAvailableCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories first
        const categoriesResponse = await categories.getAll()
        setAvailableCategories(categoriesResponse.data)

        // Then fetch budget settings
        const budgetResponse = await budgetSettings.get()
        const data = budgetResponse.data

        setBudgetData({
          monthlyLimit: data?.monthlyLimit ?? 0,
          categoryLimits: data?.categoryLimits ?? []
        })
      } catch (error) {
        console.error('Error fetching budget data:', error)
        toast.error('Failed to load budget settings')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await budgetSettings.update({
        monthlyLimit: Number(budgetData.monthlyLimit),
        categoryLimits: budgetData.categoryLimits.map(cl => ({
          categoryId: cl.categoryId,
          limit: Number(cl.limit)
        }))
      })

      setBudgetData({
        monthlyLimit: response.data.monthlyLimit,
        categoryLimits: response.data.categoryLimits
      })
      
      toast.success('Budget settings updated successfully')
    } catch (error) {
      console.error('Error updating budget settings:', error)
      toast.error('Failed to update budget settings')
    } finally {
      setSaving(false)
    }
  }

  const handleCategoryLimitChange = (categoryId, limit) => {
    setBudgetData(prev => ({
      ...prev,
      categoryLimits: prev.categoryLimits.map(cl => 
        cl.categoryId === categoryId 
          ? { ...cl, limit: limit === '' ? '' : Number(limit) }
          : cl
      )
    }))
  }

  const addCategoryLimit = (categoryId) => {
    if (!budgetData.categoryLimits.find(cl => cl.categoryId === categoryId)) {
      setBudgetData(prev => ({
        ...prev,
        categoryLimits: [...prev.categoryLimits, { categoryId, limit: 0 }]
      }))
    }
  }

  const removeCategoryLimit = (categoryId) => {
    setBudgetData(prev => ({
      ...prev,
      categoryLimits: prev.categoryLimits.filter(cl => cl.categoryId !== categoryId)
    }))
  }

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Budget Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Monthly Budget Limit
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              min="0"
              step="0.01"
              value={budgetData.monthlyLimit}
              onChange={(e) => setBudgetData(prev => ({ 
                ...prev, 
                monthlyLimit: e.target.value === '' ? '' : Number(e.target.value)
              }))}
              className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Budgets
          </label>
          <div className="space-y-4">
            {availableCategories.map(category => {
              const categoryLimit = budgetData.categoryLimits.find(cl => cl.categoryId === category._id)
              return (
                <div key={category._id} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {category.name}
                    </label>
                    {categoryLimit ? (
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={categoryLimit.limit}
                          onChange={(e) => handleCategoryLimitChange(category._id, e.target.value)}
                          className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="0.00"
                        />
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => addCategoryLimit(category._id)}
                        className="mt-1 text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        + Add budget limit
                      </button>
                    )}
                  </div>
                  {categoryLimit && (
                    <button
                      type="button"
                      onClick={() => removeCategoryLimit(category._id)}
                      className="text-red-600 hover:text-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Budget Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BudgetSettings 