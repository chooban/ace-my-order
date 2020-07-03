export function useClipboard(dataToCopy: string) {
  return async (e: any) => {
    e.preventDefault()
    const { currentTarget } = e

    const value = currentTarget.dataset[dataToCopy]

    if (!value) {
      return
    }

    try {
      await navigator.clipboard.writeText(value)
      console.info(`Value, ${value}, written to clipboard`)
      const flash = currentTarget.parentNode?.querySelector('.fadeout') as HTMLElement
      if (flash) {
        flash.style.transition = 'all 2s ease-in-out'
        flash.style.visibility = 'visible'
        flash.style.opacity = '0'

        flash.addEventListener('transitionend', () => {
          flash.style.transition = ''
          flash.style.visibility = 'hidden'
          flash.style.opacity = '1'
        })
      }
    } catch {
      console.error('Failed to write to the clipboard')
    }
  }
}
