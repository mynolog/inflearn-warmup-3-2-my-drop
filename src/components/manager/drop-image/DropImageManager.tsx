'use client'

import type { StorageFile } from '@/types/supabaseTypes'
import DropImage from '@/components/ui/drop-image/DropImage'

interface DropImageManager {
  image: StorageFile
}

export default function DropImageManager({ image }: DropImageManager) {
  return (
    <li>
      <DropImage image={image} />
    </li>
  )
}
