import { useState } from 'react'

function Navbar() {
  const [user] = useState({
    name: 'Eric Doe',
    email: 'eric@codeofafrica.com'
  })

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">Wallet App</h1>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 mr-2">{user.name}</span>
            <button className="bg-gray-200 p-2 rounded-full">
              {user.name.charAt(0)}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 