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

        setFileErrorState(oversizedFileNames)
      }

      if (validFiles.length > 0) {
        const formData = new FormData()
        validFiles.forEach((file) => {
          // 파일명에 한글 포함되어 있을 경우 파일명 변경 후 업로드
          const safeFileName = generateSafeFileName(file.name)
          const safeFile = new ExtendedFile(
            [file],
            safeFileName,
            {
              type: file.type,
              lastModified: file.lastModified,
            },
            `./${safeFileName}`,
            `./${safeFileName}`,
          )

          formData.append(safeFileName, safeFile)
        })
        uploadImageMutation.mutate(formData)
      }
    },
    [uploadImageMutation, setFileErrorState, resetFileError],
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
    },
  })

  return (
    <ImagePicker
      dropzoneState={dropzoneState}
      isPending={uploadImageMutation.isPending}
      isError={error}
      hasInvalideFileError={invalidFileError}
    />
  )
}
