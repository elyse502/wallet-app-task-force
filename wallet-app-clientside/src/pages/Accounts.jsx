import { useState, useEffect } from 'react'
import { accounts } from '../services/api'
import AccountList from '../components/Accounts/AccountList'
import AccountForm from '../components/Accounts/AccountForm'
import Modal from '../components/UI/Modal'

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
    return <div>Loading accounts...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Accounts</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Account
        </button>
      </div>

      <AccountList accountsData={accountsData} onAccountChange={fetchAccounts} />

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