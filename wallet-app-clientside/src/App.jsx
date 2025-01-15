import { ToastContainer } from 'react-toastify'
import ErrorBoundary from './components/UI/ErrorBoundary'
import AppRoutes from './routes'
import { AuthProvider } from './context/AuthContext'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
          <ToastContainer position="top-right" />
        </div>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App