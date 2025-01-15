import { useState } from 'react'
import { transactions } from '../../services/api'
import { toast } from 'react-toastify'

function RecurringTransactionForm({ onSuccess, editData = null, onCancel }) {
  const [formData, setFormData] = useState({
    amount: editData?.amount || '',
    type: editData?.type || 'expense',
    description: editData?.description || '',
    category: editData?.category?._id || '',
    account: editData?.account?._id || '',
    frequency: editData?.frequency || 'monthly',
    startDate: editData?.startDate || new Date().toISOString().split('T')[0],
    endDate: editData?.endDate || '',
    isRecurring: true
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editData) {
        await transactions.updateRecurring(editData._id, formData)
        toast.success('Recurring transaction updated successfully')
      } else {
        await transactions.createRecurring(formData)
        toast.success('Recurring transaction created successfully')
      }
      onSuccess()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving recurring transaction')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
          Frequency
        </label>
        <select
          id="frequency"
          value={formData.frequency}
          onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
          End Date (Optional)
        </label>
        <input
          type="date"
          id="endDate"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {/* Reuse other fields from TransactionForm */}
      {/* ... amount, type, category, account fields ... */}

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
          {editData ? 'Update' : 'Create'} Recurring Transaction
        </button>
      </div>
    </form>
  )
}

export default RecurringTransactionForm 