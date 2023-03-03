export const isNetworkError = (error: unknown) => {
  return (
    error instanceof Error &&
    [
      'Failed to fetch', // Fetch API
      'Network request failed', // Apollo
    ].includes(error.message)
  )
}
