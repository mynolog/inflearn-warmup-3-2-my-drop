'use client'

import type { MydropRow } from '@/actions/storageActions'
import { UseQueryResult } from '@tanstack/react-query'
import DropImageManager from '@/components/manager/drop-image/DropImageManager'
import { useSearchStore } from '@/stores/useSearchStore'
import Skeleton from '../skeleton/Skeleton'

interface DropImageList {
  filteredImageList: MydropRow[]
  imagesQuery: UseQueryResult<MydropRow[] | null>
}

export default function DropImageList({ filteredImageList, imagesQuery }: DropImageList) {
  const { searchQuery } = useSearchStore()

  return (
    <div>
      {/* 초기 렌더링 시 스켈레톤 UI 표시 */}
      {imagesQuery.isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 h-52">
          {[...Array(4)].map((_, index) => (
            <div className="flex items-center justify-center h-52" key={index}>
              <Skeleton width="100%" height="100%" className="rounded-xl" />
            </div>
          ))}
        </div>
      )}
      {/* 스토리지에 저장된 이미지가 없을 경우 UI 표시 */}
      {imagesQuery.isSuccess && imagesQuery.data?.length === 0 && searchQuery === '' && (
        <p className="text-center text-gray-500 font-bold text-lg mt-4">
          📷 아직 저장된 이미지가 없네요. 새로운 이미지를 올려주세요!
        </p>
      )}
      {/* 검색 키워드와 일치하는 파일이 없을 경우 UI 표시 */}
      {filteredImageList && filteredImageList.length === 0 && searchQuery !== '' && (
        <p className="text-center text-gray-500 font-bold text-lg mt-4">
          😢 결과를 찾지 못했어요! 다른 키워드로 검색해볼까요?
        </p>
      )}

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 h-52">
        {filteredImageList.map((image) => (
          <DropImageManager key={image.id} image={image} />
        ))}
      </ul>
    </div>
  )
}
