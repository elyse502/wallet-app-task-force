import { useState } from 'react'
import { accounts } from '../../services/api'
import { toast } from 'react-toastify'
import Modal from '../UI/Modal'
import AccountForm from './AccountForm'

function AccountList({ accountsData, onAccountChange }) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleEdit = (account) => {
    setSelectedAccount(account)
    setShowEditModal(true)
  }

  const handleDelete = async (accountId) => {
    try {
      const response = await accounts.delete(accountId)
      if (response.data) {
        toast.success('Account deleted successfully')
        onAccountChange()
      }
    } catch (error) {
      console.error('Delete error:', error)
      toast.error(error.response?.data?.message || 'Failed to delete account')
    }
    setShowDeleteConfirm(false)
    setSelectedAccount(null)
  }

  const confirmDelete = (account) => {
    setSelectedAccount(account)
    setShowDeleteConfirm(true)
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {accountsData.map((account) => (
          <li key={account._id}>
            <div className="px-4 py-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{account.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{account.type}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4 mt-2 sm:mt-0">
                  <span className="text-xl font-semibold text-gray-900">
                    ${account.balance.toFixed(2)}
                  </span>
                  <div className="flex space-x-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => handleEdit(account)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(account)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Account"
      >
        <AccountForm
          editData={selectedAccount}
          onSuccess={() => {
            setShowEditModal(false)
            onAccountChange()
          }}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>

      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete this account?</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowDeleteConfirm(false)}
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

export default AccountList 