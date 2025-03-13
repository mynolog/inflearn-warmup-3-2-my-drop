'use client'

import type { MydropRow } from '@/actions/storageActions'
import Image from 'next/image'
import BaseButton from '../button/BaseButton'
import Spinner from '../spinner/Spinner'
import DownloadButton from '../button/DownloadButton'

interface DropImageProps {
  image: MydropRow
  onDelete: ({ imageId, fileName }: { imageId: MydropRow['imageId']; fileName: string }) => void
  isPending: boolean
  localCreatedAt: string
  localUpdatedAt: string | null
}

export default function DropImage({
  image,
  onDelete,
  isPending,
  localCreatedAt,
  localUpdatedAt,
}: DropImageProps) {
  const handleDeleteClick = () => {
    onDelete({ imageId: image.imageId, fileName: image.name })
  }

  return (
    <div className="group w-full flex flex-col gap-2 border border-gray-100 bg-white hover:bg-gray-100 rounded-2xl shadow-md overflow-hidden transition-hover animate-fadeIn">
      <div className="flex items-center justify-between px-2 pt-2 gap-2 overflow-hidden">
        <div className="w-5/6 flex flex-col flex-grow min-w-0">
          <div className="w-5/6 truncate">
            <i className="fas fa-image text-soft-blue-800 text-md mr-2"></i>
            <span className=" text-sm font-semibold">{image.originalName}</span>
          </div>
          <div className="w-5/6 truncate">
            <span
              className={`text-[0.7rem] font-semibold ${localUpdatedAt ? 'text-mint-800' : 'text-gray-500'}`}
            >
              {localUpdatedAt ? localUpdatedAt : localCreatedAt}
            </span>
            {localUpdatedAt && (
              <span className="text-[0.7rem] font-semibold text-mint-800"> (수정)</span>
            )}
          </div>
        </div>
        <DownloadButton
          imageUrl={image.imageUrl}
          fileName={image.originalName}
          className="w-7 h-6 rounded-lg flex-shrink-0"
        />
        <BaseButton
          bgColor="bg-red-500"
          className="w-7 h-6 rounded-lg flex-shrink-0"
          onClick={handleDeleteClick}
        >
          {isPending ? <Spinner /> : <i className="fas fa-trash text-xs"></i>}
        </BaseButton>
      </div>

      <div className=" w-full h-40 relative overflow-hidden">
        <Image
          src={image.imageUrl}
          alt={image.name}
          fill
          priority
          quality={80}
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover object-center transition-all duration-150 ease-linear group-hover:scale-110"
        />
      </div>
    </div>
  )
}
