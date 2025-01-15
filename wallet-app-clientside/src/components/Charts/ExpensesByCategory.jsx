import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

function ExpensesByCategory({ data }) {
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        data: data.map(item => Math.abs(item.amount)),
        backgroundColor: [
          '#4F46E5',
          '#7C3AED',
          '#EC4899',
          '#F59E0B',
          '#10B981',
        ],
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    maintainAspectRatio: false,
  }

  return <Doughnut data={chartData} options={options} />
}

export default ExpensesByCategory 