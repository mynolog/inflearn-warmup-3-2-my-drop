'use client'

import type { StorageFile } from '@/types/supabaseTypes'
import DropImage from '@/components/ui/drop-image/DropImage'
import { useMutation } from '@tanstack/react-query'
import { deleteImage } from '@/actions/storageActions'
import { queryClient } from '@/providers/ReactQueryClientProvider'
import { QUERY_KEY } from '@/constants/reactQueryConstants'

interface DropImageManager {
  image: StorageFile
}

export default function DropImageManager({ image }: DropImageManager) {
  const deleteImageMutation = useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.IMAGES],
      })
    },
  })

  const handleDeleteImage = (fileName: string) => {
    deleteImageMutation.mutate(fileName)
  }

  return (
    <li>
      <DropImage
        image={image}
        onDelete={handleDeleteImage}
        isPending={deleteImageMutation.isPending}
      />
    </li>
  )
}
