export function useClipboard() {
  return async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      console.info(`Value, ${value}, written to clipboard`)
    } catch {
      console.error('Failed to write to the clipboard')
    }
  }
}
