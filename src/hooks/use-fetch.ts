import { useEffect, useState } from 'react'

type BodyType = 'json' | 'text' | 'blob' | 'raw'

export function useFetch<T>(url: string, bodyType: BodyType, params?: RequestInit) {
  const [response, setResponse] = useState<T|null>(null)
  const [error, setError] = useState<string|null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

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
      .then(res => {
        switch (bodyType) {
          case 'json':
            return res.json()
          case 'text':
            return res.text()
          case 'blob':
            return res.blob()
          default:
            return res
        }
      })
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
  }, [params, url, bodyType])
  return { response, error, isLoading }
}
