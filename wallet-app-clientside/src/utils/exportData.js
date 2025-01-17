import { format } from 'date-fns'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

export const exportToExcel = async (data, fileName) => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('No data available to export')
  }

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  saveAs(blob, `${fileName}-${format(new Date(), 'yyyy-MM-dd')}.xlsx`)
}

export const exportToCSV = async (data, fileName) => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('No data available to export')
  }

  const replacer = (key, value) => value === null ? '' : value
  const header = Object.keys(data[0])
  const csv = [
    header.join(','),
    ...data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  ].join('\r\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, `${fileName}-${format(new Date(), 'yyyy-MM-dd')}.csv`)
}

export const prepareTransactionData = (transactions) => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return []
  }

  return transactions.map(transaction => ({
    Date: format(new Date(transaction.date), 'yyyy-MM-dd'),
    Type: transaction.type,
    Amount: transaction.amount,
    Description: transaction.description,
    Category: transaction.category?.name || 'Uncategorized',
    Account: transaction.account?.name || 'Unknown Account'
  }))
}

export const exportToPDF = (data, fileName) => {
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(16)
  doc.text('Transaction Report', 14, 15)
  
  // Add date
  doc.setFontSize(10)
  doc.text(`Generated on: ${format(new Date(), 'PPP')}`, 14, 25)

  // Add summary
  const summary = data.reduce(
    (acc, row) => {
      if (row.Type === 'income') {
        acc.totalIncome += row.Amount
      } else {
        acc.totalExpenses += row.Amount
      }
      acc.netAmount = acc.totalIncome - acc.totalExpenses
      return acc
    },
    { totalIncome: 0, totalExpenses: 0, netAmount: 0 }
  )

  doc.setFontSize(12)
  doc.text(`Total Income: $${summary.totalIncome.toFixed(2)}`, 14, 35)
  doc.text(`Total Expenses: $${summary.totalExpenses.toFixed(2)}`, 14, 42)
  doc.text(`Net Amount: $${summary.netAmount.toFixed(2)}`, 14, 49)

  // Add table
  doc.autoTable({
    startY: 60,
    head: [['Date', 'Description', 'Category', 'Account', 'Type', 'Amount']],
    body: data.map(row => [
      row.Date,
      row.Description,
      row.Category,
      row.Account,
      row.Type,
      `$${row.Amount.toFixed(2)}`
    ]),
    styles: { fontSize: 8 },
    headStyles: { 
      fillColor: [63, 81, 181],
      textColor: [255, 255, 255]
    },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 50 },
      2: { cellWidth: 30 },
      3: { cellWidth: 30 },
      4: { cellWidth: 25 },
      5: { cellWidth: 25, halign: 'right' }
    }
  })

  // Save the PDF
  doc.save(`${fileName}-${format(new Date(), 'yyyy-MM-dd')}.pdf`)
}

export const exportToJSON = (data, fileName) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  saveAs(blob, `${fileName}-${format(new Date(), 'yyyy-MM-dd')}.json`)
} 