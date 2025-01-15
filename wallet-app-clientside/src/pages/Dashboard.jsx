import AccountsSummary from '../components/Dashboard/AccountsSummary'
import RecentTransactions from '../components/Dashboard/RecentTransactions'
import TransactionCharts from '../components/Dashboard/TransactionCharts'

function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AccountsSummary />
        <RecentTransactions />
      </div>
      
      <div className="w-full">
        <TransactionCharts />
      </div>
    </div>
  )
}

export default Dashboard 