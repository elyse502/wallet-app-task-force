import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function IncomeVsExpenses({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Income',
        data: data.income,
        backgroundColor: '#10B981',
      },
      {
        label: 'Expenses',
        data: data.expenses.map(val => Math.abs(val)),
        backgroundColor: '#EF4444',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return <Bar data={chartData} options={options} />
}

export default IncomeVsExpenses 