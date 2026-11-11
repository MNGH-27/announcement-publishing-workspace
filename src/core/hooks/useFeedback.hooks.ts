import { toast } from 'sonner'
import { useCallback, useState } from 'react'

export interface FeedbackError {
  message: string
  occurredAt: string
  cause: unknown
}

/** Request feedback is kept in memory; service outcomes belong to feature state. */
export function useFeedback() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setErrorState] = useState<FeedbackError | null>(null)
  const [errors, setErrors] = useState<FeedbackError[]>([])

  const setError = useCallback((cause: unknown) => {
    const feedback = {
      message:
        cause instanceof Error
          ? cause.message
          : typeof cause === 'string'
            ? cause
            : 'Something went wrong. Please try again.',
      occurredAt: new Date().toISOString(),
      cause,
    }
    toast.error(feedback.message)
    setErrorState(feedback)
    setErrors((previous) => [...previous.slice(-49), feedback])
  }, [])

  const clearError = useCallback(() => setErrorState(null), [])

  const reset = useCallback(() => {
    setIsLoading(false)
    setErrorState(null)
    setErrors([])
  }, [])

  return {
    isLoading,
    setIsLoading,
    isError: error !== null,
    error,
    errors,
    setError,
    clearError,
    reset,
  }
}
