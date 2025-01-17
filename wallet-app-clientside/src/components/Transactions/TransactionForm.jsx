import { useState, useEffect } from 'react'
import { transactions, accounts, categories, budgetSettings } from '../../services/api'
import { toast } from 'react-toastify'

function TransactionForm({ onSuccess, editData = null, onCancel }) {
  const [formData, setFormData] = useState({
    amount: editData?.amount || '',
    type: editData?.type || 'expense',
    description: editData?.description || '',
    date: editData?.date ? new Date(editData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    category: editData?.category?._id || '',
    account: editData?.account?._id || ''
  })

  const [accountsList, setAccountsList] = useState([])
  const [categoriesList, setCategoriesList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accountsRes, categoriesRes] = await Promise.all([
          accounts.getAll(),
          categories.getAll()
        ])
        setAccountsList(accountsRes.data)
        setCategoriesList(categoriesRes.data)
      } catch (error) {
        console.error('Error fetching form data:', error)
        toast.error('Error loading form data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editData) {
        await transactions.update(editData._id, formData)
      } else {
        await transactions.create(formData)

        // Check budget after adding an expense
        if (formData.type === 'expense') {
          const startDate = new Date()
          startDate.setDate(1)
          const [transactionsRes, budgetRes] = await Promise.all([
            transactions.getAll({ 
              startDate: startDate.toISOString(),
              endDate: new Date().toISOString()
            }),
            budgetSettings.get()
          ])

          const monthlyExpenses = transactionsRes.data
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + Number(t.amount), 0)

          const { monthlyLimit, categoryLimits } = budgetRes.data

          if (monthlyLimit && monthlyExpenses > monthlyLimit) {
            toast.error(
              `🚨 Budget Alert: This transaction puts you over your monthly budget! ($${monthlyExpenses.toFixed(2)}/$${monthlyLimit.toFixed(2)})`,
              { autoClose: false }
            )
          }

          if (formData.category && categoryLimits?.length > 0) {
            const categoryLimit = categoryLimits.find(cl => cl.categoryId === formData.category)
            if (categoryLimit) {
              const categoryExpenses = transactionsRes.data
                .filter(t => t.type === 'expense' && t.category?._id === formData.category)
                .reduce((sum, t) => sum + Number(t.amount), 0)

              if (categoryExpenses > categoryLimit.limit) {
                toast.error(
                  `🚨 Category Alert: This transaction exceeds the budget for this category! ($${categoryExpenses.toFixed(2)}/$${categoryLimit.limit.toFixed(2)})`,
                  { autoClose: false }
                )
              }
            }
          }
        }
      }

      toast.success(`Transaction ${editData ? 'updated' : 'added'} successfully`)
      onSuccess()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving transaction')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading form...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Transaction Type
        </label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
          step="0.01"
          min="0"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        >
          <option value="">Select a category</option>
          {categoriesList.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="account" className="block text-sm font-medium text-gray-700">
          Account
        </label>
        <select
          id="account"
          value={formData.account}
          onChange={(e) => setFormData({ ...formData, account: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        >
          <option value="">Select an account</option>
          {accountsList.map((account) => (
            <option key={account._id} value={account._id}>
              {account.name} (${account.balance})
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          {editData ? 'Update' : 'Create'} Transaction
        </button>
      </div>
    </form>
  )
}

export default TransactionForm 