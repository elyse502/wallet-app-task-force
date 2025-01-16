import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { transactions as transactionsApi } from '../../services/api'
import { exportToCSV, exportToExcel, exportToPDF, prepareTransactionData } from '../../utils/exportData'

function Reports() {
    const [loading, setLoading] = useState(true)
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await transactionsApi.getAll()
                setTransactions(response.data)
            } catch (error) {
                toast.error('Failed to fetch transactions')
                console.error('Fetch error:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchTransactions()
    }, [])

    const handleExport = async (format) => {
        if (!Array.isArray(transactions) || transactions.length === 0) {
            toast.error('No transactions available to export')
            return
        }

        try {
            const data = prepareTransactionData(transactions)
            
            if (data.length === 0) {
                toast.error('No data available to export')
                return
            }

            await Promise.resolve(() => {
                switch (format) {
                    case 'csv':
                        exportToCSV(data, 'transactions')
                        break
                    case 'excel':
                        exportToExcel(data, 'transactions')
                        break
                    case 'pdf':
                        exportToPDF(data, 'transactions')
                        break
                    default:
                        throw new Error('Unsupported export format')
                }
            })

            toast.success(`Successfully exported to ${format.toUpperCase()}`)
        } catch (error) {
            toast.error(error.message || 'Export failed')
            console.error('Export error:', error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
                <div className="space-x-2">
                    {!loading && transactions.length > 0 && (
                        <>
                            <button
                                onClick={() => handleExport('csv')}
                                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                Export CSV
                            </button>
                            <button
                                onClick={() => handleExport('excel')}
                                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                Export Excel
                            </button>
                            <button
                                onClick={() => handleExport('pdf')}
                                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                Export PDF
                            </button>
                        </>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <p className="text-gray-500">Loading transactions...</p>
                </div>
            ) : transactions.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <p className="text-gray-500">No transactions available for reporting.</p>
                    <p className="text-sm text-gray-400 mt-2">Add some transactions to see them here.</p>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow">
                    {/* Your existing transaction table/chart code */}
                </div>
            )}
        </div>
    )
}

export default Reports 