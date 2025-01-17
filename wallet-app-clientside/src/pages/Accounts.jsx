import { useState, useEffect } from 'react'
import { accounts } from '../services/api'
import AccountForm from '../components/Accounts/AccountForm'
import Modal from '../components/UI/Modal'
import PageLoader from '../components/UI/PageLoader'
import { toast } from 'react-toastify'
import { PencilIcon, TrashIcon, BanknotesIcon, BuildingLibraryIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'

function Accounts() {
  const [accountsData, setAccountsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(null)

  const fetchAccounts = async () => {
    try {
      const response = await accounts.getAll()
      setAccountsData(response.data)
    } catch (error) {
      console.error('Error fetching accounts:', error)
      toast.error('Failed to fetch accounts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  const handleEdit = (account) => {
    setSelectedAccount(account)
    setShowEditModal(true)
  }

  const handleDelete = async (accountId) => {
    try {
      await accounts.delete(accountId)
      toast.success('Account deleted successfully')
      fetchAccounts()
    } catch (error) {
      toast.error('Failed to delete account')
    }
    setShowDeleteModal(false)
    setSelectedAccount(null)
  }

  const confirmDelete = (account) => {
    setSelectedAccount(account)
    setShowDeleteModal(true)
  }

  const getAccountIcon = (type) => {
    switch (type) {
      case 'bank':
        return <BuildingLibraryIcon className="h-6 w-6 text-blue-500" />
      case 'cash':
        return <BanknotesIcon className="h-6 w-6 text-green-500" />
      case 'mobile':
        return <DevicePhoneMobileIcon className="h-6 w-6 text-purple-500" />
      default:
        return <BanknotesIcon className="h-6 w-6 text-gray-500" />
    }
  }

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

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {accountsData.map((account) => (
          <div 
            key={account._id} 
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5">
              <div 
                className={`h-full ${
                  account.type === 'bank' 
                    ? 'bg-blue-500' 
                    : account.type === 'cash'
                    ? 'bg-green-500'
                    : 'bg-purple-500'
                }`}
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getAccountIcon(account.type)}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{account.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{account.type}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(account)}
                    className="p-1.5 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors duration-200"
                    title="Edit account"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => confirmDelete(account)}
                    className="p-1.5 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors duration-200"
                    title="Delete account"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-500">Balance</span>
                  <span className="text-xl font-semibold text-gray-900">
                    ${account.balance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Account Modal */}
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

      {/* Edit Account Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Account"
      >
        <AccountForm
          editData={selectedAccount}
          onSuccess={() => {
            setShowEditModal(false)
            fetchAccounts()
          }}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this account? This action cannot be undone and will also delete all transactions associated with this account.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(selectedAccount._id)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Accounts 