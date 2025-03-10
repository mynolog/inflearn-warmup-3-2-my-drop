'use client'

import { useMemo } from 'react'
import DropImageList from '@/components/ui/drop-image-list/DropImageList'
import { useSearchStore } from '@/stores/useSearchStore'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '@/constants/reactQueryConstants'
import { searchImages } from '@/actions/storageActions'
import Skeleton from '@/components/ui/skeleton/Skeleton'
import useDebounce from '@/hooks/useDebounce'

export default function DropImageListManager() {
  const { searchQuery } = useSearchStore()
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const { data: imageList, isLoading } = useQuery({
    queryKey: [QUERY_KEY.IMAGES],
    queryFn: () => searchImages(),
  })

  const filteredImageList = useMemo(
    () =>
      imageList?.filter((image) =>
        image.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
      ) ?? [],
    [imageList, debouncedSearchQuery],
  )

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-4 h-52">
        {[...Array(4)].map((_, index) => (
          <div className="flex items-center justify-center" key={index}>
            <Skeleton width="100%" height="100%" className="rounded-xl" />
          </div>
        ))}
      </div>
    )
  }

  if (filteredImageList.length === 0) {
    return (
      <p className="text-center text-gray-500 font-bold text-2xl mt-4">😢 검색 결과가 없습니다. </p>
    )
  }

  return <DropImageList imageList={filteredImageList} />
}
