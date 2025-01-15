import { useMemo } from 'react'

function ReportSummary({ transactions }) {
  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.totalIncome += transaction.amount
        } else {
          acc.totalExpenses += transaction.amount
        }
        acc.netAmount = acc.totalIncome - acc.totalExpenses
        return acc
      },
      { totalIncome: 0, totalExpenses: 0, netAmount: 0 }
    )
  }, [transactions])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
        <p className="mt-2 text-3xl font-bold text-green-600">
          ${summary.totalIncome.toFixed(2)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
        <p className="mt-2 text-3xl font-bold text-red-600">
          ${summary.totalExpenses.toFixed(2)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500">Net Amount</h3>
        <p
          className={`mt-2 text-3xl font-bold ${
            summary.netAmount >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          ${summary.netAmount.toFixed(2)}
        </p>
      </div>
    </div>
  )
}

export default ReportSummary 