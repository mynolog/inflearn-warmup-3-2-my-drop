'use client'

import { useCallback, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useDropzone } from 'react-dropzone'
import ImagePicker from '@/components/ui/image-picker/ImagePicker'
import { uploadImage } from '@/actions/storageActions'
import { queryClient } from '@/providers/ReactQueryClientProvider'
import { QUERY_KEY } from '@/constants/reactQueryConstants'
import { MAX_FILE_SIZE } from '@/constants/supabaseConstants'
import useFileError from '@/hooks/useFileError'

export default function ImagePickerManager() {
  const [invalidFileError, setInvalidFileError] = useState('')
  const { error, setFileErrorState, resetFileError } = useFileError()

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.IMAGES],
      })
    },
    onError: (error) => {
      setInvalidFileError(error.message)
    },
  })

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      resetFileError()
      const oversizedFiles = acceptedFiles.filter((file) => file.size > MAX_FILE_SIZE)
      const validFiles = acceptedFiles.filter((file) => file.size <= MAX_FILE_SIZE)

      if (oversizedFiles.length > 0) {
        const oversizedFileNames = oversizedFiles.map((file) => file.name)

        // 파일명 출력
        setFileErrorState(oversizedFileNames)
      }

      if (validFiles.length > 0) {
        const formData = new FormData()
        validFiles.forEach((file) => {
          formData.append(file.name, file)
        })
        uploadImageMutation.mutate(formData)
      }
    },
    [uploadImageMutation, setFileErrorState, resetFileError],
  )

  const dropzoneState = useDropzone({ onDrop, multiple: true })

  return (
    <ImagePicker
      dropzoneState={dropzoneState}
      isPending={uploadImageMutation.isPending}
      isError={error}
      hasInvalideFileError={invalidFileError}
    />
  )
}
