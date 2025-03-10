'use client'

import DropImageManager from '@/components/manager/drop-image/DropImageManager'
import { StorageFile } from '@/types/supabaseTypes'

interface DropImageList {
  imageList: StorageFile[]
}

export default function DropImageList({ imageList }: DropImageList) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {imageList.map((image) => (
        <DropImageManager key={image.id} image={image} />
      ))}
    </ul>
  )
}
