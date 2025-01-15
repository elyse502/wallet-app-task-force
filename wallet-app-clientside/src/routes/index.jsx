import Dashboard from '../pages/Dashboard'
import Transactions from '../pages/Transactions'
import Accounts from '../pages/Accounts'
import Categories from '../pages/Categories'
import Reports from '../pages/Reports'

const routes = [
  {
    path: '/',
    element: <Dashboard />
  },
  // ... other routes
  {
    path: '/reports',
    element: <Reports />
  }
] 