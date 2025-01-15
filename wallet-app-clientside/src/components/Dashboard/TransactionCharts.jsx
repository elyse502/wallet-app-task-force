import { useState, useEffect } from 'react'
import { Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
)

function TransactionCharts({ transactions }) {
  const [expensesByCategory, setExpensesByCategory] = useState({
    labels: [],
    data: []
  })
  const [monthlyTotals, setMonthlyTotals] = useState({
    labels: [],
    expenses: [],
    income: []
  })

  useEffect(() => {
    if (!transactions?.length) return

    // Process expenses by category
    const categoryTotals = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        const category = t.category?.name || 'Uncategorized'
        acc[category] = (acc[category] || 0) + t.amount
        return acc
      }, {})

    setExpensesByCategory({
      labels: Object.keys(categoryTotals),
      data: Object.values(categoryTotals)
    })

    // Process monthly totals
    const monthlyData = transactions.reduce((acc, t) => {
      const date = new Date(t.date)
      const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' })
      
      if (!acc[monthYear]) {
        acc[monthYear] = { expenses: 0, income: 0 }
      }
      
      if (t.type === 'expense') {
        acc[monthYear].expenses += t.amount
      } else {
        acc[monthYear].income += t.amount
      }
      
      return acc
    }, {})

    const months = Object.keys(monthlyData)
    setMonthlyTotals({
      labels: months,
      expenses: months.map(m => monthlyData[m].expenses),
      income: months.map(m => monthlyData[m].income)
    })
  }, [transactions])

  const pieChartData = {
    labels: expensesByCategory.labels,
    datasets: [
      {
        data: expensesByCategory.data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }
    ]
  }

  const lineChartData = {
    labels: monthlyTotals.labels,
    datasets: [
      {
        label: 'Expenses',
        data: monthlyTotals.expenses,
        borderColor: '#FF6384',
        fill: false
      },
      {
        label: 'Income',
        data: monthlyTotals.income,
        borderColor: '#36A2EB',
        fill: false
      }
    ]
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Expenses by Category</h3>
          <div className="h-64">
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Monthly Overview</h3>
          <div className="h-64">
            <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionCharts 