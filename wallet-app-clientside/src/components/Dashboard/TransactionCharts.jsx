import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { transactions } from '../../services/api'
import { format, startOfMonth, endOfMonth } from 'date-fns'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function TransactionCharts() {
  const [chartData, setChartData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await transactions.getAll()
        const monthStart = startOfMonth(new Date())
        const monthEnd = endOfMonth(new Date())

        // Filter transactions for current month
        const monthlyTransactions = response.data.filter(
          (t) => new Date(t.date) >= monthStart && new Date(t.date) <= monthEnd
        )

        // Group by date
        const groupedData = monthlyTransactions.reduce((acc, transaction) => {
          const date = format(new Date(transaction.date), 'MMM dd')
          if (!acc[date]) {
            acc[date] = { income: 0, expense: 0 }
          }
          if (transaction.type === 'income') {
            acc[date].income += transaction.amount
          } else {
            acc[date].expense += Math.abs(transaction.amount)
          }
          return acc
        }, {})

        const labels = Object.keys(groupedData)
        const incomeData = labels.map((date) => groupedData[date].income)
        const expenseData = labels.map((date) => groupedData[date].expense)

        setChartData({
          labels,
          datasets: [
            {
              label: 'Income',
              data: incomeData,
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.5)',
            },
            {
              label: 'Expenses',
              data: expenseData,
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgba(239, 68, 68, 0.5)',
            },
          ],
        })
      } catch (error) {
        console.error('Error fetching transaction data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactionData()
  }, [])

  if (loading || !chartData) {
    return <div>Loading chart...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Overview</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  )
}

export default TransactionCharts 