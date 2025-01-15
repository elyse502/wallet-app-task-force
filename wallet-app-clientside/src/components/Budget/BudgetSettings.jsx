import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { categories } from '../../services/api'
import { toast } from 'react-toastify'

function BudgetSettings() {
  const { user, updateUser } = useAuth()
  const [budgetData, setBudgetData] = useState({
    monthlyLimit: user?.budget?.monthlyLimit || 0,
    categoryLimits: user?.budget?.categoryLimits || [],
    alerts: {
      enabled: user?.budget?.alerts?.enabled ?? true,
      threshold: user?.budget?.alerts?.threshold || 80
    }
  })
  const [availableCategories, setAvailableCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categories.getAll()
        setAvailableCategories(response.data)
      } catch (error) {
        toast.error('Failed to fetch categories')
      }
    }
    fetchCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateUser({ budget: budgetData })
      toast.success('Budget settings updated successfully')
    } catch (error) {
      toast.error('Failed to update budget settings')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">Budget Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Monthly Budget Limit
          </label>
          <div className="mt-1">
            <input
              type="number"
              min="0"
              value={budgetData.monthlyLimit}
              onChange={(e) => setBudgetData({
                ...budgetData,
                monthlyLimit: parseFloat(e.target.value)
              })}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category Budgets
          </label>
          <div className="mt-2 space-y-4">
            {availableCategories.map((category) => (
              <div key={category._id} className="flex items-center space-x-4">
                <span className="w-1/3">{category.name}</span>
                <input
                  type="number"
                  min="0"
                  value={
                    budgetData.categoryLimits.find(
                      (cl) => cl.category === category._id
                    )?.amount || ''
                  }
                  onChange={(e) => {
                    const newLimits = [...budgetData.categoryLimits]
                    const existingIndex = newLimits.findIndex(
                      (cl) => cl.category === category._id
                    )
                    if (existingIndex >= 0) {
                      newLimits[existingIndex].amount = parseFloat(e.target.value)
                    } else {
                      newLimits.push({
                        category: category._id,
                        amount: parseFloat(e.target.value)
                      })
                    }
                    setBudgetData({ ...budgetData, categoryLimits: newLimits })
                  }}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Set budget"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Budget Alerts
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={budgetData.alerts.enabled}
                onChange={(e) => setBudgetData({
                  ...budgetData,
                  alerts: {
                    ...budgetData.alerts,
                    enabled: e.target.checked
                  }
                })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-500">Enable alerts</span>
            </div>
          </div>
          {budgetData.alerts.enabled && (
            <div className="mt-2">
              <label className="text-sm text-gray-500">
                Alert when spending reaches
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={budgetData.alerts.threshold}
                  onChange={(e) => setBudgetData({
                    ...budgetData,
                    alerts: {
                      ...budgetData.alerts,
                      threshold: parseInt(e.target.value)
                    }
                  })}
                  className="mx-2 w-16 text-center shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
                % of budget
              </label>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  )
}

export default BudgetSettings 