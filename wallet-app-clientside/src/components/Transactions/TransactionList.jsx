import { useState } from 'react'
import { transactions } from '../../services/api'
import { toast } from 'react-toastify'
import Modal from '../UI/Modal'
import TransactionForm from './TransactionForm'
import { format } from 'date-fns'

function TransactionList({ transactionsData, onTransactionChange }) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction)
    setShowEditModal(true)
  }

  const handleDelete = async (transactionId) => {
    try {
      await transactions.delete(transactionId)
      toast.success('Transaction deleted successfully')
      onTransactionChange()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting transaction')
    }
    setShowDeleteConfirm(false)
    setSelectedTransaction(null)
  }

  const confirmDelete = (transaction) => {
    setSelectedTransaction(transaction)
    setShowDeleteConfirm(true)
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Account
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactionsData.map((transaction) => (
            <tr key={transaction._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(transaction.date), 'MMM dd, yyyy')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {transaction.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.category?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.account?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`font-medium ${
                    transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {transaction.type === 'expense' ? '-' : '+'}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleEdit(transaction)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(transaction)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Transaction"
      >
        <TransactionForm
          editData={selectedTransaction}
          onSuccess={() => {
            setShowEditModal(false)
            onTransactionChange()
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
          <p>Are you sure you want to delete this transaction?</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(selectedTransaction._id)}
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

export default TransactionList 