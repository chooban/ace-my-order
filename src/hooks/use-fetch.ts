import { useState, useEffect } from 'react'

function useFetch<T>(url: string, params?: RequestInit) {
  const [response, setResponse] = useState<T|null>(null)
  const [error, setError] = useState<string|null>(null)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const abortController =new AbortController()
    const signal =abortController.signal

    setResponse(null)
    setError(null)
    setIsLoading(true)
    fetch(url, params ? { ...params, signal } : { signal })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Not found')
        }
        return res
      })
      .then(res => res.json())
      .then(data => {
        setResponse(data)
        setIsLoading(false)
      })
      .catch(err => {
        // If the request was aborted by us then we don't
        // want to try setting an state on an unmounted component.
        if (err.code !== 20) {
          setIsLoading(false)
          setError(err)
        }
      })

    return function cleanup() {
      abortController.abort()
    }
  }, [params, url])
  return { response, error, isLoading }
}
export { useFetch }
