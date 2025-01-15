import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { transactions, categories, accounts } from '../../services/api'

function TransactionForm({ onSuccess, initialData = null }) {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    account: ''
  })
  const [availableCategories, setAvailableCategories] = useState([])
  const [availableAccounts, setAvailableAccounts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await categories.getAll()
        setAvailableCategories(categoriesResponse.data)

        // Fetch accounts
        const accountsResponse = await accounts.getAll()
        setAvailableAccounts(accountsResponse.data)

        // If editing, populate form with initial data
        if (initialData) {
          setFormData({
            type: initialData.type,
            amount: Math.abs(initialData.amount),
            description: initialData.description,
            date: new Date(initialData.date).toISOString().split('T')[0],
            category: initialData.category?._id || '',
            account: initialData.account?._id || ''
          })
        }
      } catch (error) {
        toast.error('Failed to load form data')
      }
    }

    fetchData()
  }, [initialData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (initialData) {
        await transactions.update(initialData._id, formData)
        toast.success('Transaction updated successfully')
      } else {
        await transactions.create(formData)
        toast.success('Transaction created successfully')
      }
      
      onSuccess?.()
      
      // Reset form if not editing
      if (!initialData) {
        setFormData({
          type: 'expense',
          amount: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
          category: '',
          account: ''
        })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save transaction')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Transaction Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select a category</option>
            {availableCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Account */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Account
          </label>
          <select
            value={formData.account}
            onChange={(e) => setFormData({ ...formData, account: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select an account</option>
            {availableAccounts.map((account) => (
              <option key={account._id} value={account._id}>
                {account.name} (${account.balance.toFixed(2)})
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : initialData ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </div>
    </form>
  )
}

export default TransactionForm 