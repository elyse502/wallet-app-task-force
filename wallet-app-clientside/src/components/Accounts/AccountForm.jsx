import { useState } from 'react'
import { accounts } from '../../services/api'
import { toast } from 'react-toastify'

function AccountForm({ onSuccess, editData = null, onCancel }) {
  const [formData, setFormData] = useState({
    name: editData?.name || '',
    type: editData?.type || 'bank',
    balance: editData?.balance || 0
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editData) {
        await accounts.update(editData._id, formData)
        toast.success('Account updated successfully')
      } else {
        await accounts.create(formData)
        toast.success('Account created successfully')
      }
      onSuccess()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving account')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Account Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Account Type
        </label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="bank">Bank</option>
          <option value="cash">Cash</option>
          <option value="mobile">Mobile Money</option>
        </select>
      </div>

      <div>
        <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
          Initial Balance
        </label>
        <input
          type="number"
          id="balance"
          value={formData.balance}
          onChange={(e) => setFormData({ ...formData, balance: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
          step="0.01"
          disabled={editData}
        />
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
          {editData ? 'Update' : 'Create'} Account
        </button>
      </div>
    </form>
  )
}

export default AccountForm 