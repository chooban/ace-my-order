module.exports = function (fn, skip) {
  return async (args) => {
    if (skip) {
      return fn(args)
    }
    const start = new Date()
    const hrstart = process.hrtime()

    const result = await fn(args)

    const end = new Date() - start
    const hrend = process.hrtime(hrstart)

    console.info('Execution time: %dms', end)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)

    return result
  }
}

