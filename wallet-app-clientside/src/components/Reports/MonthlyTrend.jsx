import { useMemo } from 'react'
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
import { format, parseISO, startOfMonth } from 'date-fns'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function MonthlyTrend({ transactions }) {
  const chartData = useMemo(() => {
    const monthlyData = transactions.reduce((acc, transaction) => {
      const month = format(startOfMonth(parseISO(transaction.date)), 'MMM yyyy')
      if (!acc[month]) {
        acc[month] = { income: 0, expenses: 0 }
      }
      if (transaction.type === 'income') {
        acc[month].income += transaction.amount
      } else {
        acc[month].expenses += transaction.amount
      }
      return acc
    }, {})

    const labels = Object.keys(monthlyData)
    const incomeData = labels.map((month) => monthlyData[month].income)
    const expenseData = labels.map((month) => monthlyData[month].expenses)

    return {
      labels,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.5)'
        },
        {
          label: 'Expenses',
          data: expenseData,
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.5)'
        }
      ]
    }
  }, [transactions])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Monthly Income vs Expenses'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Line data={chartData} options={options} />
    </div>
  )
}

export default MonthlyTrend 