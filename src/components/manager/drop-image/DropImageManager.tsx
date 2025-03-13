'use client'
import type { MydropRow } from '@/actions/storageActions'
import DropImage from '@/components/ui/drop-image/DropImage'
import { useMutation } from '@tanstack/react-query'
import { deleteImage } from '@/actions/storageActions'
import { queryClient } from '@/providers/ReactQueryClientProvider'
import { QUERY_KEY } from '@/constants/reactQueryConstants'
import { getLocalTime } from '@/utils/format/format'

interface DropImageManager {
  image: MydropRow
}

export default function DropImageManager({ image }: DropImageManager) {
  const localCreatedAt = getLocalTime(image.createdAt)
  const localUpdatedAt = image.updatedAt ? getLocalTime(image.updatedAt) : null
  const deleteImageMutation = useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.IMAGES],
      })
    },
  })

  const handleDeleteImage = ({
    imageId,
    fileName,
  }: {
    imageId: MydropRow['imageId']
    fileName: string
  }) => {
    deleteImageMutation.mutate({ imageId, fileName })
  }

  return (
    <li>
      <DropImage
        image={image}
        onDelete={handleDeleteImage}
        isPending={deleteImageMutation.isPending}
        localCreatedAt={localCreatedAt}
        localUpdatedAt={localUpdatedAt}
      />
    </li>
  )
}
