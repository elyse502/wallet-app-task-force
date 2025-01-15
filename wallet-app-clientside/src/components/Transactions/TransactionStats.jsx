import { useMemo } from 'react'
import { format, startOfMonth, endOfMonth } from 'date-fns'

function TransactionStats({ transactions }) {
  const stats = useMemo(() => {
    const currentDate = new Date()
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)

    return transactions.reduce(
      (acc, transaction) => {
        const transactionDate = new Date(transaction.date)
        const isCurrentMonth =
          transactionDate >= monthStart && transactionDate <= monthEnd

        if (transaction.type === 'income') {
          acc.totalIncome += transaction.amount
          if (isCurrentMonth) acc.monthlyIncome += transaction.amount
        } else {
          acc.totalExpenses += transaction.amount
          if (isCurrentMonth) acc.monthlyExpenses += transaction.amount
        }

        if (transaction.amount > acc.largestTransaction.amount) {
          acc.largestTransaction = {
            amount: transaction.amount,
            description: transaction.description,
            type: transaction.type
          }
        }

        return acc
      },
      {
        totalIncome: 0,
        totalExpenses: 0,
        monthlyIncome: 0,
        monthlyExpenses: 0,
        largestTransaction: { amount: 0, description: '', type: '' }
      }
    )
  }, [transactions])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-medium text-gray-500">Total Balance</h3>
        <p
          className={`mt-2 text-2xl font-bold ${
            stats.totalIncome - stats.totalExpenses >= 0
              ? 'text-green-600'
              : 'text-red-600'
          }`}
        >
          ${(stats.totalIncome - stats.totalExpenses).toFixed(2)}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Income: ${stats.totalIncome.toFixed(2)}
          <br />
          Expenses: ${stats.totalExpenses.toFixed(2)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-medium text-gray-500">This Month</h3>
        <p
          className={`mt-2 text-2xl font-bold ${
            stats.monthlyIncome - stats.monthlyExpenses >= 0
              ? 'text-green-600'
              : 'text-red-600'
          }`}
        >
          ${(stats.monthlyIncome - stats.monthlyExpenses).toFixed(2)}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Income: ${stats.monthlyIncome.toFixed(2)}
          <br />
          Expenses: ${stats.monthlyExpenses.toFixed(2)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-medium text-gray-500">Monthly Average</h3>
        <div className="mt-2">
          <p className="text-sm">
            <span className="text-green-600 font-medium">
              +${(stats.monthlyIncome / 30).toFixed(2)}
            </span>{' '}
            <span className="text-gray-500">/ day income</span>
          </p>
          <p className="text-sm">
            <span className="text-red-600 font-medium">
              -${(stats.monthlyExpenses / 30).toFixed(2)}
            </span>{' '}
            <span className="text-gray-500">/ day expenses</span>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-medium text-gray-500">Largest Transaction</h3>
        <p
          className={`mt-2 text-2xl font-bold ${
            stats.largestTransaction.type === 'income'
              ? 'text-green-600'
              : 'text-red-600'
          }`}
        >
          ${stats.largestTransaction.amount.toFixed(2)}
        </p>
        <p className="mt-1 text-sm text-gray-500 truncate">
          {stats.largestTransaction.description}
        </p>
      </div>
    </div>
  )
}

export default TransactionStats 