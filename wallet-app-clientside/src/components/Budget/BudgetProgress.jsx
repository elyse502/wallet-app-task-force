import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { transactions } from '../../services/api'
import { startOfMonth, endOfMonth } from 'date-fns'
import { toast } from 'react-toastify'

function BudgetProgress() {
  const { user } = useAuth()
  const [monthlySpending, setMonthlySpending] = useState(0)
  const [categorySpending, setCategorySpending] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMonthlyTransactions = async () => {
      try {
        const startDate = startOfMonth(new Date())
        const endDate = endOfMonth(new Date())
        
        const response = await transactions.getAll({
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        })

        // Calculate total spending
        const totalSpending = response.data
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + Math.abs(t.amount), 0)

        // Calculate spending by category
        const byCategory = response.data
          .filter(t => t.type === 'expense')
          .reduce((acc, t) => {
            const categoryId = t.category?._id
            if (categoryId) {
              acc[categoryId] = (acc[categoryId] || 0) + Math.abs(t.amount)
            }
            return acc
          }, {})

        setMonthlySpending(totalSpending)
        setCategorySpending(byCategory)
      } catch (error) {
        console.error('Failed to fetch transactions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMonthlyTransactions()
  }, [])

  useEffect(() => {
    if (user?.budget?.alerts?.enabled) {
      const threshold = user.budget.alerts.threshold
      const limit = user.budget.monthlyLimit
      const percentage = (monthlySpending / limit) * 100

      // Warning at 50%
      if (percentage >= 50 && percentage < threshold) {
        toast.info(`You've used 50% of your monthly budget`)
      }
      
      // Warning at threshold
      if (percentage >= threshold) {
        toast.warning(`Alert: You've reached ${threshold}% of your monthly budget!`)
      }
      
      // Warning at 90%
      if (percentage >= 90) {
        toast.error(`Critical: You've used 90% of your monthly budget!`)
      }
      
      // Over budget warning
      if (percentage > 100) {
        toast.error(`You've exceeded your monthly budget limit!`, {
          autoClose: false
        })
      }
    }
  }, [monthlySpending, user?.budget])

  const calculateProgress = (spent, limit) => {
    if (!limit) return 0
    return Math.min((spent / limit) * 100, 100)
  }

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-red-500'
    if (progress >= 75) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  if (loading) {
    return <div className="animate-pulse h-48 bg-gray-200 rounded-lg"></div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Budget Progress</h2>
        <p className="text-sm text-gray-500">Current month's spending overview</p>
      </div>

      {/* Overall Budget Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700">Overall Budget</span>
          <span className="text-gray-500">
            ${monthlySpending.toFixed(2)} / ${user?.budget?.monthlyLimit?.toFixed(2) || '0.00'}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className={`h-2 rounded-full transition-all ${getProgressColor(
              calculateProgress(monthlySpending, user?.budget?.monthlyLimit)
            )}`}
            style={{
              width: `${calculateProgress(
                monthlySpending,
                user?.budget?.monthlyLimit
              )}%`
            }}
          ></div>
        </div>
      </div>

      {/* Category Budget Progress */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Category Budgets</h3>
        {user?.budget?.categoryLimits?.map((catLimit) => {
          const spent = categorySpending[catLimit.category] || 0
          const progress = calculateProgress(spent, catLimit.amount)
          const category = catLimit.category

          return (
            <div key={category._id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">
                  {category.name}
                </span>
                <span className="text-gray-500">
                  ${spent.toFixed(2)} / ${catLimit.amount.toFixed(2)}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full transition-all ${getProgressColor(progress)}`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Alert Messages */}
      {user?.budget?.alerts?.enabled && monthlySpending >= (user?.budget?.monthlyLimit * (user?.budget?.alerts?.threshold / 100)) && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          ⚠️ You have reached {user?.budget?.alerts?.threshold}% of your monthly budget!
        </div>
      )}
    </div>
  )
}

export default BudgetProgress 