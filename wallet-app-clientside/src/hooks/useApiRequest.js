import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'

export function useApiRequest() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(
    async (apiFunction) => {
      try {
        setLoading(true)
        setError(null)
        const response = await apiFunction()
        return response
      } catch (err) {
        setError(err)
        const errorMessage = err.response?.data?.message || 'An error occurred'
        toast.error(errorMessage)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { execute, loading, error }
} 