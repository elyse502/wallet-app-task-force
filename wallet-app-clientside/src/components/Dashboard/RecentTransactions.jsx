import { useState, useEffect } from 'react'
import { transactions } from '../../services/api'
import { format } from 'date-fns'

function RecentTransactions() {
  const [recentTransactions, setRecentTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await transactions.getAll()
        setRecentTransactions(response.data.slice(0, 5)) // Get only the 5 most recent
      } catch (error) {
        console.error('Error fetching transactions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  if (loading) {
    return <div>Loading transactions...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {recentTransactions.map((transaction) => (
          <div
            key={transaction._id}
            className="flex justify-between items-center p-3 bg-gray-50 rounded"
          >
            <div>
              <p className="font-medium text-gray-800">{transaction.description}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(transaction.date), 'MMM dd, yyyy')}
              </p>
            </div>
            <p
              className={`font-semibold ${
                transaction.type === 'expense'
                  ? 'text-red-600'
                  : 'text-green-600'
              }`}
            >
              {transaction.type === 'expense' ? '-' : '+'}$
              {Math.abs(transaction.amount).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentTransactions 