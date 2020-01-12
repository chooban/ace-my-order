const formatAsGBP = (v: number) => ({
  value: v ? `£${v.toFixed(2)}` : ''
})

export { formatAsGBP }
