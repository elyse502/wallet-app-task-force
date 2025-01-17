import { useState, useEffect } from 'react'
import { transactions, budgetSettings } from '../../services/api'
import { toast } from 'react-toastify'

function BudgetAlert() {
  useEffect(() => {
    const checkBudget = async () => {
      try {
        // Get current month's transactions
        const startDate = new Date()
        startDate.setDate(1)
        const endDate = new Date()
        
        const [transactionsRes, budgetRes] = await Promise.all([
          transactions.getAll({ 
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
          }),
          budgetSettings.get()
        ])

        const monthlyExpenses = transactionsRes.data
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + Number(t.amount), 0)

        const { monthlyLimit, categoryLimits } = budgetRes.data

        // Check overall monthly budget
        if (monthlyLimit && monthlyExpenses > monthlyLimit) {
          toast.error(
            `🚨 Budget Alert: Monthly spending ($${monthlyExpenses.toFixed(2)}) has exceeded your limit ($${monthlyLimit.toFixed(2)})!`,
            { 
              autoClose: false,
              toastId: 'monthly-budget-exceeded'
            }
          )
        } else if (monthlyLimit && monthlyExpenses > monthlyLimit * 0.9) {
          toast.warning(
            `⚠️ Budget Warning: You're approaching your monthly budget limit ($${monthlyExpenses.toFixed(2)}/$${monthlyLimit.toFixed(2)})`,
            { 
              autoClose: false,
              toastId: 'monthly-budget-warning'
            }
          )
        }

        // Check category budgets
        if (categoryLimits?.length > 0) {
          const categoryExpenses = {}
          transactionsRes.data
            .filter(t => t.type === 'expense' && t.category)
            .forEach(t => {
              categoryExpenses[t.category._id] = {
                spent: (categoryExpenses[t.category._id]?.spent || 0) + Number(t.amount),
                name: t.category.name
              }
            })

          categoryLimits.forEach(({ categoryId, limit }) => {
            const category = categoryExpenses[categoryId]
            if (category && limit) {
              if (category.spent > limit) {
                toast.error(
                  `🚨 Category Alert: ${category.name} spending ($${category.spent.toFixed(2)}) has exceeded the limit ($${limit.toFixed(2)})!`,
                  { 
                    autoClose: false,
                    toastId: `category-exceeded-${categoryId}`
                  }
                )
              } else if (category.spent > limit * 0.9) {
                toast.warning(
                  `⚠️ Category Warning: ${category.name} is approaching its budget limit ($${category.spent.toFixed(2)}/$${limit.toFixed(2)})`,
                  { 
                    autoClose: false,
                    toastId: `category-warning-${categoryId}`
                  }
                )
              }
            }
          })
        }
      } catch (error) {
        console.error('Error checking budget:', error)
      }
    }

    // Check on mount and every 5 minutes
    checkBudget()
    const interval = setInterval(checkBudget, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return null
}

export default BudgetAlert 