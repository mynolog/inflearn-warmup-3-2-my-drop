'use client'

import Image from 'next/image'
import type { StorageFile } from '@/types/supabaseTypes'
import BaseButton from '../button/BaseButton'
import { getPublicImageUrl } from '@/utils/supabase/storage'

interface DropImageProps {
  image: StorageFile
}

export default function DropImage({ image }: DropImageProps) {
  return (
    <div className="group w-full flex flex-col gap-2 border border-gray-100 rounded-2xl shadow-md overflow-hidden">
      <div className="w-full h-40 relative">
        <Image
          src={getPublicImageUrl(image.name)}
          alt={image.name}
          fill
          priority
          quality={100}
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover object-center transition-all duration-150 ease-linear group-hover:scale-1"
        />
      </div>
      <div className="w-full flex items-center justify-between px-2 pb-2 z-50 bg-white">
        <span>{image.name}</span>
        <BaseButton bgColor="bg-red-500" className="w-9 h-7 rounded-lg">
          <i className="fas fa-trash"></i>
        </BaseButton>
      </div>
    </div>
  )
}
