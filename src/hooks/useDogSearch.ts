import { useState, useEffect } from 'react'
import { api } from '../api'
import type { Dog } from '../types'

export type SortField = 'breed' | 'name' | 'age'

interface SearchParams {
  breeds: string[]
  sortField: SortField
  sortDir: 'asc' | 'desc'
  pageCursor?: string    
  pageSize?: number
}

interface DogSearchResponse {
  resultIds: string[]
  total: number
  prev?: string
  next?: string
}

interface DogSearchQuery {
  breeds?: string[]
  size: number
  sort: string
}

export function useDogSearch({
  breeds,
  sortField,
  sortDir,
  pageCursor,
  pageSize = 25,
}: SearchParams) {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [total, setTotal] = useState<number>(0)
  const [prevCursor, setPrevCursor] = useState<string | undefined>(undefined)
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let canceled = false

    async function fetchPage() {
      setLoading(true)
      setError(null)

      try {
        let searchRes
        if (pageCursor) {
          // cursor‐based pagination
          searchRes = await api.get<DogSearchResponse>(`/dogs/search?${pageCursor}`)
        } else {
       
          const query: DogSearchQuery = {
            size: pageSize,
            sort: `${sortField}:${sortDir}`,
          }
          if (breeds.length > 0) {
            query.breeds = breeds
          }

          searchRes = await api.get<DogSearchResponse>('/dogs/search', { params: query })
        }

        if (canceled) return
        const { resultIds, total, prev, next } = searchRes.data

        setTotal(total)
        setPrevCursor(prev)
        setNextCursor(next)

        if (resultIds.length) {
          const dogsRes = await api.post<Dog[]>('/dogs', resultIds)
          if (!canceled) setDogs(dogsRes.data)
        } else {
          setDogs([])
        }
      } catch (err: unknown) {
        if (!canceled) {
          setError(err instanceof Error ? err.message : String(err))
        }
      } finally {
        if (!canceled) setLoading(false)
      }
    }

    fetchPage()
    return () => {
      canceled = true
    }
  }, [breeds.join(','), sortField, sortDir, pageCursor, pageSize])

  return { dogs, total, prevCursor, nextCursor, loading, error }
}
