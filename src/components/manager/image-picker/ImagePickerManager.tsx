'use client'

import type { FormEvent } from 'react'
import { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import ImagePicker from '@/components/ui/image-picker/ImagePicker'
import { uploadImage } from '@/actions/storageActions'
import { queryClient } from '@/providers/ReactQueryClientProvider'
import { QUERY_KEY } from '@/constants/reactQueryConstants'

export default function ImagePickerManager() {
  const imageInputRef = useRef<HTMLInputElement | null>(null)

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.IMAGES],
      })
    },
  })

  const handleImageUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const input = imageInputRef.current
    const file = input?.files?.[0]

    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      uploadImageMutation.mutate(formData)
    }
  }

  return (
    <ImagePicker
      onSubmit={handleImageUpload}
      ref={imageInputRef}
      isLoading={uploadImageMutation.isPending}
    />
  )
}
