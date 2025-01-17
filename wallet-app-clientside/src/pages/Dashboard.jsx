import AccountsSummary from '../components/Dashboard/AccountsSummary'
import RecentTransactions from '../components/Dashboard/RecentTransactions'
import TransactionCharts from '../components/Dashboard/TransactionCharts'
import BudgetProgress from '../components/Budget/BudgetProgress'
import BudgetSettings from '../components/Budget/BudgetSettings'

function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccountsSummary />
        <BudgetProgress />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <BudgetSettings />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransactionCharts />
        <RecentTransactions />
      </div>
    </div>
  )
}

export default Dashboard 