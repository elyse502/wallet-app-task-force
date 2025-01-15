import { useState, useEffect } from 'react'
import { transactions } from '../services/api'
import TransactionList from '../components/Transactions/TransactionList'
import TransactionForm from '../components/Transactions/TransactionForm'
import Modal from '../components/UI/Modal'

function Transactions() {
  const [transactionsData, setTransactionsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  const fetchTransactions = async () => {
    try {
      const response = await transactions.getAll()
      setTransactionsData(response.data)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  if (loading) {
    return <div>Loading transactions...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Transaction
        </button>
      </div>

      <TransactionList
        transactionsData={transactionsData}
        onTransactionChange={fetchTransactions}
      />

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Transaction"
      >
        <TransactionForm
          onSuccess={() => {
            setShowAddModal(false)
            fetchTransactions()
          }}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  )
}

export default Transactions 