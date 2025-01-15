import { useState } from 'react'
import ExpensesByCategory from '../components/Charts/ExpensesByCategory'
import IncomeVsExpenses from '../components/Charts/IncomeVsExpenses'

function Reports() {
  const [dateRange, setDateRange] = useState('month')

  // Dummy data for charts
  const expenseData = [
    { category: 'Food & Dining', amount: -500 },
    { category: 'Transportation', amount: -200 },
    { category: 'Utilities', amount: -300 },
    { category: 'Entertainment', amount: -150 },
    { category: 'Shopping', amount: -250 },
  ]

  const incomeExpenseData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    income: [3000, 3200, 3000, 3500, 3200, 3800],
    expenses: [-2000, -2300, -1900, -2500, -2200, -2400],
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Reports</h2>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Expense by Category</h3>
          <div className="h-64">
            <ExpensesByCategory data={expenseData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Income vs Expenses</h3>
          <div className="h-64">
            <IncomeVsExpenses data={incomeExpenseData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports 