import { useState, useEffect } from 'react'
import { transactions } from '../services/api'
import TransactionList from '../components/Transactions/TransactionList'
import TransactionForm from '../components/Transactions/TransactionForm'
import TransactionFilters from '../components/Transactions/TransactionFilters'
import TransactionStats from '../components/Transactions/TransactionStats'
import Modal from '../components/UI/Modal'
import PageLoader from '../components/UI/PageLoader'
import { useApiRequest } from '../hooks/useApiRequest'

function Transactions() {
  const [transactionsData, setTransactionsData] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)

  const { execute, loading } = useApiRequest()

  const fetchTransactions = async () => {
    try {
      const response = await execute(() => transactions.getAll())
      setTransactionsData(response.data)
      setFilteredTransactions(response.data)
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const handleFilterChange = (filters) => {
    let filtered = [...transactionsData]

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        (transaction) =>
          transaction.description.toLowerCase().includes(searchTerm) ||
          transaction.category?.name.toLowerCase().includes(searchTerm) ||
          transaction.account?.name.toLowerCase().includes(searchTerm)
      )
    }

    // Apply type filter
    if (filters.type) {
      filtered = filtered.filter((transaction) => transaction.type === filters.type)
    }

    // Apply account filter
    if (filters.account) {
      filtered = filtered.filter(
        (transaction) => transaction.account?._id === filters.account
      )
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(
        (transaction) => transaction.category?._id === filters.category
      )
    }

    // Apply date range filter
    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date)
        return (
          transactionDate >= new Date(filters.startDate) &&
          transactionDate <= new Date(filters.endDate)
        )
      })
    }

    setFilteredTransactions(filtered)
  }

  if (loading) {
    return <PageLoader />
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

      <TransactionStats transactions={filteredTransactions} />

      <TransactionFilters onFilterChange={handleFilterChange} />

      <TransactionList
        transactionsData={filteredTransactions}
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