import { useState, useEffect } from 'react'
import { accounts } from '../services/api'
import AccountList from '../components/Accounts/AccountList'
import AccountForm from '../components/Accounts/AccountForm'
import Modal from '../components/UI/Modal'
import PageLoader from '../components/UI/PageLoader'

function Accounts() {
  const [accountsData, setAccountsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  const fetchAccounts = async () => {
    try {
      const response = await accounts.getAll()
      setAccountsData(response.data)
    } catch (error) {
      console.error('Error fetching accounts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accounts</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your bank accounts, cash, and other financial accounts
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Account
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {accountsData.map((account) => (
          <div key={account._id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{account.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{account.type}</p>
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  ${account.balance.toFixed(2)}
                </span>
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => handleEdit(account)}
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(account)}
                  className="text-sm text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Account"
      >
        <AccountForm
          onSuccess={() => {
            setShowAddModal(false)
            fetchAccounts()
          }}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  )
}

export default Accounts 