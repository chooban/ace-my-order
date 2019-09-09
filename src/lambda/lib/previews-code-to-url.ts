const urlPrefix = 'https://www.previewsworld.com'
function previewsCodeToUrl(issue: number, item: string) {
  const MonthNames = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ]
  const epoch = new Date(1988, 8, 1)
  epoch.setMonth(epoch.getMonth() + issue)

  const slug = MonthNames[epoch.getMonth()] + (epoch.getFullYear() - 2000) + item
  return {
    url: `${urlPrefix}/Catalog/${slug}`,
    urlPrefix
  }
}

export { previewsCodeToUrl }
