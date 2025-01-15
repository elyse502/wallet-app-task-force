import { useState } from 'react'
import TransactionForm from '../components/Transactions/TransactionForm'

function Transactions() {
  const [showForm, setShowForm] = useState(false)
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Grocery Shopping', amount: -150, date: '2024-03-15', category: 'Food', account: 'Bank Account' },
    { id: 2, description: 'Salary', amount: 3000, date: '2024-03-01', category: 'Income', account: 'Bank Account' },
    { id: 3, description: 'Internet Bill', amount: -50, date: '2024-03-10', category: 'Utilities', account: 'Credit Card' },
  ])

  // Dummy data for form dropdowns
  const accounts = [
    { id: 1, name: 'Bank Account' },
    { id: 2, name: 'Cash Wallet' },
    { id: 3, name: 'Credit Card' },
  ]

  const categories = [
    { id: 1, name: 'Food' },
    { id: 2, name: 'Income' },
    { id: 3, name: 'Utilities' },
  ]

  const handleAddTransaction = (newTransaction) => {
    setTransactions([
      ...transactions,
      {
        id: transactions.length + 1,
        ...newTransaction
      }
    ])
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Transactions</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Add Transaction
        </button>
      </div>

      {showForm && (
        <TransactionForm
          onSubmit={handleAddTransaction}
          onClose={() => setShowForm(false)}
          accounts={accounts}
          categories={categories}
        />
      )}

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.account}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(transaction.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Transactions 