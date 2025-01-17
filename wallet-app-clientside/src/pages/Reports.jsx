import { useState } from 'react'
import { useApiRequest } from '../hooks/useApiRequest'
import { transactions } from '../services/api'
import DateRangePicker from '../components/Reports/DateRangePicker'
import ReportSummary from '../components/Reports/ReportSummary'
import CategoryChart from '../components/Reports/CategoryChart'
import MonthlyTrend from '../components/Reports/MonthlyTrend'
import ReportTable from '../components/Reports/ReportTable'
import { exportToExcel, exportToCSV, exportToPDF } from '../utils/exportData'
import PageLoader from '../components/UI/PageLoader'
import { DocumentIcon, TableCellsIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

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

    switch (type) {
      case 'excel':
        exportToExcel(data, 'transactions-report')
        break
      case 'csv':
        exportToCSV(data, 'transactions-report')
        break
      case 'pdf':
        exportToPDF(data, 'transactions-report')
        break
      default:
        break
    }
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="mt-2 text-sm text-gray-700">
            Analyze your financial activity and export reports
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => handleExport('excel')}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 inline-flex items-center justify-center gap-2"
          >
            <TableCellsIcon className="h-5 w-5" />
            Excel
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 inline-flex items-center justify-center gap-2"
          >
            <DocumentTextIcon className="h-5 w-5" />
            CSV
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 inline-flex items-center justify-center gap-2"
          >
            <DocumentIcon className="h-5 w-5" />
            PDF
          </button>
        </div>
      </div>

      <DateRangePicker
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onChange={handleDateRangeChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportSummary transactions={transactionsData} />
        <MonthlyTrend transactions={transactionsData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart transactions={transactionsData} type="expense" />
        <CategoryChart transactions={transactionsData} type="income" />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ReportTable 
          transactions={transactionsData}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default Reports 