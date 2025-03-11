import { useState } from 'react'

export interface FileError {
  hasError: boolean
  message: string
  fileNames?: string[]
}

export default function useFileError() {
  const [fileError, setFileError] = useState<FileError>({
    hasError: false,
    fileNames: [],
    message: '',
  })

  const setFileErrorState = (fileNames: string[]) => {
    setFileError({
      hasError: fileNames.length > 0,
      fileNames,
      message: `다음 파일은 1MB를 초과하여 업로드할 수 없습니다: ${fileNames.join(', ')}`,
    })
  }

  const resetFileError = () => {
    setFileError({
      hasError: false,
      fileNames: [],
      message: '',
    })
  }

  return {
    error: {
      hasError: fileError.hasError,
      message: fileError.message,
    },
    setFileErrorState,
    resetFileError,
  }
}
