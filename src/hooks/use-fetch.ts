import { useState, useEffect } from 'react'

const useFetch = (url: string, params?: RequestInit) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState<string|null>(null)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(
    () => {
      setResponse(null)
      setError(null)
      setIsLoading(true)
      fetch(url, params ? params : undefined)
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
          setIsLoading(false)
          setError(err)
        })

    }, [params, url])
  return { response, error, isLoading }
}
export { useFetch }
