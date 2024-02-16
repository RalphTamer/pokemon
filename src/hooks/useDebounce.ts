import { useEffect, useState } from "react"
import _ from "lodash"

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const debounceHandler = _.debounce(() => {
      setDebouncedValue(value)
    }, delay)

    debounceHandler()

    return debounceHandler.cancel
  }, [value, delay])

  return debouncedValue
}
