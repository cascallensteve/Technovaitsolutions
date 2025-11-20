import { useEffect } from 'react'

/**
 * Simple hook to set the document title for each page/route.
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    if (!title) return
    document.title = title
  }, [title])
}
