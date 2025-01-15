import { useState, useEffect } from 'react'
import { transactions } from '../services/api'
import ReportSummary from '../components/Reports/ReportSummary'
import CategoryChart from '../components/Reports/CategoryChart'
import MonthlyTrend from '../components/Reports/MonthlyTrend'
import TransactionFilters from '../components/Transactions/TransactionFilters'

function Reports() {
  const [transactionsData, setTransactionsData] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTransactions = async () => {
    try {
      const response = await transactions.getAll()
      setTransactionsData(response.data)
      setFilteredTransactions(response.data)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const handleFilterChange = (filters) => {
    let filtered = [...transactionsData]

    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date)
        return (
          transactionDate >= new Date(filters.startDate) &&
          transactionDate <= new Date(filters.endDate)
        )
      })
    }

    if (filters.type) {
      filtered = filtered.filter((transaction) => transaction.type === filters.type)
    }

    if (filters.category) {
      filtered = filtered.filter(
        (transaction) => transaction.category?._id === filters.category
      )
    }

    if (filters.account) {
      filtered = filtered.filter(
        (transaction) => transaction.account?._id === filters.account
      )
    }

    setFilteredTransactions(filtered)
  }

  if (loading) {
    return <div>Loading reports...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>

      <TransactionFilters onFilterChange={handleFilterChange} />

      <ReportSummary transactions={filteredTransactions} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategoryChart transactions={filteredTransactions} type="expense" />
        <CategoryChart transactions={filteredTransactions} type="income" />
      </div>

      <MonthlyTrend transactions={filteredTransactions} />
    </div>
  )
}

export default Reports 