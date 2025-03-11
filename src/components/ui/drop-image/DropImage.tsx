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
    <div className="group w-full flex flex-col gap-2 border border-gray-100 bg-white hover:bg-gray-100 rounded-2xl shadow-md overflow-hidden transition-hover animate-fadeIn">
      <div className="w-full flex items-center justify-between px-2 pt-2 z-50 gap-2 overflow-hidden">
        <i className="fas fa-image text-soft-blue-800 text-xs"></i>
        <span className="w-5/6 truncate text-xs font-semibold">{image.name}</span>
        <BaseButton bgColor="bg-red-500" className="w-7 h-6 rounded-lg">
          <i className="fas fa-trash text-xs"></i>
        </BaseButton>
      </div>

      <div className=" w-full h-40 relative overflow-hidden">
        <Image
          src={getPublicImageUrl(image.name)}
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
