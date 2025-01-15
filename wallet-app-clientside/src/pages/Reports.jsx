import { useState } from 'react'
import { useApiRequest } from '../hooks/useApiRequest'
import { transactions } from '../services/api'
import TransactionCharts from '../components/Dashboard/TransactionCharts'
import DateRangePicker from '../components/Reports/DateRangePicker'
import ReportTable from '../components/Reports/ReportTable'
import { exportToExcel, exportToCSV } from '../utils/exportData'

function Reports() {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date()
  })
  const [transactionsData, setTransactionsData] = useState([])
  const { execute, loading } = useApiRequest()

  const handleDateRangeChange = async (newRange) => {
    try {
      const response = await execute(() => 
        transactions.getAll({
          startDate: newRange.startDate.toISOString(),
          endDate: newRange.endDate.toISOString()
        })
      )
      setTransactionsData(response.data)
      setDateRange(newRange)
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
    }
  }

  const handleExport = (type) => {
    const data = transactionsData.map(t => ({
      Date: new Date(t.date).toLocaleDateString(),
      Description: t.description,
      Category: t.category?.name || 'Uncategorized',
      Account: t.account?.name,
      Type: t.type,
      Amount: t.amount
    }))

    if (type === 'excel') {
      exportToExcel(data, `transactions-${dateRange.startDate.toISOString().split('T')[0]}`)
    } else {
      exportToCSV(data, `transactions-${dateRange.startDate.toISOString().split('T')[0]}`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => handleExport('excel')}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Export to Excel
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Export to CSV
          </button>
        </div>
      </div>

      <DateRangePicker
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onChange={handleDateRangeChange}
      />

      <TransactionCharts transactions={transactionsData} />
      
      <ReportTable 
        transactions={transactionsData}
        loading={loading}
      />
    </div>
  )
}

export default Reports 