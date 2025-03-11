'use client'

import DropImageList from '@/components/ui/drop-image-list/DropImageList'
import { useSearchStore } from '@/stores/useSearchStore'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '@/constants/reactQueryConstants'
import { getImages } from '@/actions/storageActions'
import useDebounce from '@/hooks/useDebounce'
import { StorageFile } from '@/types/supabaseTypes'

export default function DropImageListManager() {
  const { searchQuery } = useSearchStore()
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const imagesQuery = useQuery<StorageFile[] | null>({
    queryKey: [QUERY_KEY.IMAGES],
    queryFn: () => getImages(),
  })

  const filteredImageList = (imagesQuery.data ?? [])
    .filter((image) => image.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
    .sort((a, b) => {
      // 최신순으로 정렬
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

  return <DropImageList filteredImageList={filteredImageList} imagesQuery={imagesQuery} />
}
