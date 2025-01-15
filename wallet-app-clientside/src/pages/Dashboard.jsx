import { useState } from 'react'

function Dashboard() {
  const [summary] = useState({
    totalBalance: 5000,
    monthlyIncome: 3000,
    monthlyExpenses: 2000,
    recentTransactions: [
      { id: 1, description: 'Grocery Shopping', amount: -150, date: '2024-03-15' },
      { id: 2, description: 'Salary', amount: 3000, date: '2024-03-01' },
      { id: 3, description: 'Internet Bill', amount: -50, date: '2024-03-10' },
    ]
  })

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Total Balance</h3>
          <p className="text-2xl font-bold">${summary.totalBalance}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Monthly Income</h3>
          <p className="text-2xl font-bold text-green-600">${summary.monthlyIncome}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Monthly Expenses</h3>
          <p className="text-2xl font-bold text-red-600">${summary.monthlyExpenses}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {summary.recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <span className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(transaction.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard 