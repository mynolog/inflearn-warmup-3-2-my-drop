'use client'

import type { StorageFile } from '@/types/supabaseTypes'
import DropImageList from '@/components/ui/drop-image-list/DropImageList'
import { useSearchStore } from '@/stores/useSearchStore'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '@/constants/reactQueryConstants'
import { searchImages } from '@/actions/storageActions'

export default function DropImageListManager() {
  const { searchQuery } = useSearchStore()

  const {
    data: imageList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.IMAGES, searchQuery],
    queryFn: () => searchImages(searchQuery),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error?.message}</div>
  }

  return (
    <div>
      <DropImageList imageList={imageList as StorageFile[]} />
    </div>
  )
}
