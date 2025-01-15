import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Accounts from './pages/Accounts'
import Categories from './pages/Categories'
import Reports from './pages/Reports'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  return children
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="categories" element={<Categories />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  )
}

export default App
