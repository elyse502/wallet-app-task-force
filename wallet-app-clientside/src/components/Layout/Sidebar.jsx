import { NavLink } from 'react-router-dom'

function Sidebar() {
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/transactions', label: 'Transactions', icon: '💰' },
    { path: '/accounts', label: 'Accounts', icon: '🏦' },
    { path: '/categories', label: 'Categories', icon: '📑' },
    { path: '/reports', label: 'Reports', icon: '📈' },
  ]

  return (
    <div className="bg-white w-64 shadow-sm">
      <div className="p-4">
        <img src="/wallet-app.svg" alt="Logo" className="h-8 w-auto" />
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                isActive ? 'bg-gray-100' : ''
              }`
            }
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar 