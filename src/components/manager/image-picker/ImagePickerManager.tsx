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
import { generateSafeFileName } from '@/utils/generate/generate'
import { ExtendedFile } from '@/models/ExtendedFile'
import compressImage from '@/utils/image/image'

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

      if (oversizedFiles.length > 0) {
        const oversizedFileNames = oversizedFiles.map((file) => file.name)

        setFileErrorState(oversizedFileNames)
      }

      if (acceptedFiles.length > 0) {
        const formData = new FormData()

        const compressedFiles = await Promise.all(
          acceptedFiles.map(async (file) => {
            const compressedFile = await compressImage(file)

            const safeFileName = generateSafeFileName(compressedFile.name)
            const safeFile = new ExtendedFile(
              [compressedFile],
              safeFileName,
              {
                type: compressedFile.type,
                lastModified: compressedFile.lastModified,
              },
              `./${safeFileName}`,
              `./${safeFileName}`,
            )

            return { safeFileName, safeFile, originalFileName: compressedFile.name }
          }),
        )

        compressedFiles.forEach(({ safeFileName, safeFile, originalFileName }) => {
          formData.append(safeFileName, safeFile)
          formData.append('originalFileName', originalFileName)
        })

        uploadImageMutation.mutate(formData)
      }
    },
    [uploadImageMutation, resetFileError, setFileErrorState],
  )

  const dropzoneState = useDropzone({
    onDrop,
    multiple: true,
    // 허용되는 확장자
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/heif': ['.heif'],
      'image/heic': ['.heic'],
      'image/webp': ['.webp'],
    },
  })

  return (
    <ImagePicker
      dropzoneState={dropzoneState}
      isPending={uploadImageMutation.isPending}
      isError={error}
      hasInvalidFileError={invalidFileError}
    />
  )
}
