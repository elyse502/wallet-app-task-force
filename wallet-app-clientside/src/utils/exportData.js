import { format } from 'date-fns'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

export const exportToExcel = (data, fileName) => {
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  saveAs(blob, `${fileName}-${format(new Date(), 'yyyy-MM-dd')}.xlsx`)
}

export const exportToCSV = (data, fileName) => {
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
  return transactions.map(transaction => ({
    Date: format(new Date(transaction.date), 'yyyy-MM-dd'),
    Type: transaction.type,
    Amount: transaction.amount,
    Description: transaction.description,
    Category: transaction.category?.name || 'Uncategorized',
    Account: transaction.account?.name || 'Unknown Account'
  }))
} 