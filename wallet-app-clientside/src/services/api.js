import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

// Auth API
export const auth = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (updates) => api.put('/auth/profile', updates),
}

// Accounts API
export const accounts = {
  getAll: () => api.get('/accounts'),
  create: (accountData) => api.post('/accounts', accountData),
  update: (id, accountData) => api.put(`/accounts/${id}`, accountData),
  delete: (id) => api.delete(`/accounts/${id}`),
}

// Categories API
export const categories = {
  getAll: () => api.get('/categories'),
  create: (categoryData) => api.post('/categories', categoryData),
  update: (id, categoryData) => api.put(`/categories/${id}`, categoryData),
  delete: (id) => api.delete(`/categories/${id}`),
}

// Transactions API
export const transactions = {
  getAll: (params) => api.get('/transactions', { params }),
  create: (transactionData) => api.post('/transactions', transactionData),
  update: (id, transactionData) => api.put(`/transactions/${id}`, transactionData),
  delete: (id) => api.delete(`/transactions/${id}`),
}

// Budget Settings API
export const budgetSettings = {
  get: async () => {
    const response = await api.get('/budget-settings')
    return {
      data: {
        ...response.data,
        monthlyLimit: Number(response.data?.monthlyLimit) || 0,
        categoryLimits: response.data?.categoryLimits?.map(cl => ({
          ...cl,
          limit: Number(cl.limit) || 0
        })) || []
      }
    }
  },
  update: async (data) => {
    const sanitizedData = {
      monthlyLimit: Number(data.monthlyLimit) || 0,
      categoryLimits: data.categoryLimits?.map(cl => ({
        ...cl,
        limit: Number(cl.limit) || 0
      })) || []
    }
    return api.post('/budget-settings', sanitizedData)
  }
}

export default api 