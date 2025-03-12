'use client'

import type { MydropRow } from '@/actions/storageActions'
import Image from 'next/image'
import BaseButton from '../button/BaseButton'
import Spinner from '../spinner/Spinner'

interface DropImageProps {
  image: MydropRow
  onDelete: ({ imageId, fileName }: { imageId: MydropRow['imageId']; fileName: string }) => void
  isPending: boolean
  localUpdatedAt: string
}

export default function DropImage({ image, onDelete, isPending, localUpdatedAt }: DropImageProps) {
  const handleDeleteClick = () => {
    onDelete({ imageId: image.imageId, fileName: image.name })
  }

  return (
    <div className="group w-full flex flex-col gap-2 border border-gray-100 bg-white hover:bg-gray-100 rounded-2xl shadow-md overflow-hidden transition-hover animate-fadeIn">
      <div className="flex items-center justify-between px-2 pt-2 z-50 gap-2 overflow-hidden">
        <i className="fas fa-image text-soft-blue-800 text-xs"></i>
        <div className="w-5/6 flex flex-col flex-grow min-w-0">
          <span className="w-5/6 truncate text-xs font-semibold">{image.originalName}</span>
          <span className="w-5/6 truncate text-xs font-semibold text-soft-blue-800">
            {localUpdatedAt}
          </span>
        </div>
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
