'use client'

import type { MydropRow } from '@/actions/storageActions'
import DropImageList from '@/components/ui/drop-image-list/DropImageList'
import { useSearchStore } from '@/stores/useSearchStore'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '@/constants/reactQueryConstants'
import { getImages } from '@/actions/storageActions'
import useDebounce from '@/hooks/useDebounce'

export default function DropImageListManager() {
  const { searchQuery } = useSearchStore()
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const imagesQuery = useQuery<MydropRow[] | null>({
    queryKey: [QUERY_KEY.IMAGES],
    queryFn: () => getImages(),
  })

  const filteredImageList = (imagesQuery.data ?? [])
    .filter((image) =>
      // 한글을 완성형(NFC)으로 유니코드 정규화
      image.originalName.normalize('NFC').includes(debouncedSearchQuery.normalize('NFC')),
    )
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  return <DropImageList filteredImageList={filteredImageList} imagesQuery={imagesQuery} />
}
