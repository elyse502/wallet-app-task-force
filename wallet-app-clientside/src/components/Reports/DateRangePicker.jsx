import { useState } from 'react'
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns'

function DateRangePicker({ startDate, endDate, onChange }) {
  const [customRange, setCustomRange] = useState(false)

  const handlePresetChange = (preset) => {
    let newStartDate, newEndDate

    switch (preset) {
      case 'thisMonth':
        newStartDate = startOfMonth(new Date())
        newEndDate = new Date()
        break
      case 'lastMonth':
        newStartDate = startOfMonth(subMonths(new Date(), 1))
        newEndDate = endOfMonth(subMonths(new Date(), 1))
        break
      case 'last3Months':
        newStartDate = startOfMonth(subMonths(new Date(), 3))
        newEndDate = new Date()
        break
      case 'custom':
        setCustomRange(true)
        return
      default:
        return
    }

    setCustomRange(false)
    onChange({ startDate: newStartDate, endDate: newEndDate })
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="flex space-x-4">
        <button
          onClick={() => handlePresetChange('thisMonth')}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          This Month
        </button>
        <button
          onClick={() => handlePresetChange('lastMonth')}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Last Month
        </button>
        <button
          onClick={() => handlePresetChange('last3Months')}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Last 3 Months
        </button>
        <button
          onClick={() => handlePresetChange('custom')}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Custom Range
        </button>
      </div>

      {customRange && (
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={format(startDate, 'yyyy-MM-dd')}
              onChange={(e) => onChange({
                startDate: new Date(e.target.value),
                endDate
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={format(endDate, 'yyyy-MM-dd')}
              onChange={(e) => onChange({
                startDate,
                endDate: new Date(e.target.value)
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default DateRangePicker 