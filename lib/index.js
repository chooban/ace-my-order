
exports.previewsCodeToCatalogueId = function (previewsCode) {
  const parts = previewsCode.split('/')
  const [issue, item] = [Number(parts[0]), parts[1]]
  const MonthNames = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ]
  const epoch = new Date(1988, 8, 1)
  epoch.setMonth(epoch.getMonth() + issue)

  return MonthNames[epoch.getMonth()] + (epoch.getFullYear() - 2000) + item
}
