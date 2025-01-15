import dotenv from 'dotenv'
dotenv.config()

export const config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/wallet-app',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d'
} 