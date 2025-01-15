import { useState, useEffect } from 'react'
import { accounts } from '../../services/api'

function AccountsSummary() {
  const [accountsData, setAccountsData] = useState([])
  const [totalBalance, setTotalBalance] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await accounts.getAll()
        setAccountsData(response.data)
        const total = response.data.reduce((sum, account) => sum + account.balance, 0)
        setTotalBalance(total)
      } catch (error) {
        console.error('Error fetching accounts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAccounts()
  }, [])

  if (loading) {
    return <div>Loading accounts...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Accounts Overview</h2>
      <div className="mb-4">
        <p className="text-sm text-gray-600">Total Balance</p>
        <p className="text-2xl font-bold text-indigo-600">
          ${totalBalance.toFixed(2)}
        </p>
      </div>
      <div className="space-y-3">
        {accountsData.map((account) => (
          <div
            key={account._id}
            className="flex justify-between items-center p-3 bg-gray-50 rounded"
          >
            <div>
              <p className="font-medium text-gray-800">{account.name}</p>
              <p className="text-sm text-gray-500 capitalize">{account.type}</p>
            </div>
            <p className="font-semibold text-gray-800">
              ${account.balance.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AccountsSummary 