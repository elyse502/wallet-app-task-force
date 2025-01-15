import { useState } from 'react'
import AccountForm from '../components/Accounts/AccountForm'

function Accounts() {
  const [showForm, setShowForm] = useState(false)
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Bank Account', type: 'bank', balance: 3500 },
    { id: 2, name: 'Cash Wallet', type: 'cash', balance: 500 },
    { id: 3, name: 'Mobile Money', type: 'mobile', balance: 1000 },
  ])

  const handleAddAccount = (newAccount) => {
    setAccounts([
      ...accounts,
      {
        id: accounts.length + 1,
        ...newAccount
      }
    ])
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Accounts</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Add Account
        </button>
      </div>

      {showForm && (
        <AccountForm
          onSubmit={handleAddAccount}
          onClose={() => setShowForm(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium">{account.name}</h3>
            <p className="text-gray-500 capitalize">{account.type}</p>
            <p className="text-2xl font-bold mt-2">${account.balance}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Accounts 