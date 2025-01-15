import { useMemo } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

function CategoryChart({ transactions, type }) {
  const chartData = useMemo(() => {
    const categoryTotals = transactions
      .filter((t) => t.type === type)
      .reduce((acc, transaction) => {
        const categoryName = transaction.category?.name || 'Uncategorized'
        acc[categoryName] = (acc[categoryName] || 0) + transaction.amount
        return acc
      }, {})

    const labels = Object.keys(categoryTotals)
    const data = Object.values(categoryTotals)

    const colors = labels.map((_, index) => {
      const hue = (index * 137.508) % 360 // Use golden angle approximation
      return `hsl(${hue}, 70%, 50%)`
    })

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderColor: colors.map((color) => color.replace('0.5', '1')),
          borderWidth: 1
        }
      ]
    }
  }, [transactions, type])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right'
      },
      title: {
        display: true,
        text: `${type === 'expense' ? 'Expenses' : 'Income'} by Category`
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Pie data={chartData} options={options} />
    </div>
  )
}

export default CategoryChart 