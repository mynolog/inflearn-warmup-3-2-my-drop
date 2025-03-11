'use client'

import type { DropzoneState } from 'react-dropzone'
import type { FileError } from '@/hooks/useFileError'
import Spinner from '../spinner/Spinner'

interface ImagePickerProps {
  dropzoneState: DropzoneState
  isPending: boolean
  isError: FileError
  hasInvalideFileError: string
}

export default function ImagePicker({
  dropzoneState,
  isPending,
  isError,
  hasInvalideFileError,
}: ImagePickerProps) {
  const { getInputProps, getRootProps, isDragActive } = dropzoneState
  const { message, hasError } = isError

  return (
    <div
      {...getRootProps()}
      className="w-full h-32 border-4 border-dashed text-sm rounded-lg text-gray-500 border-mint-600 py-12 flex flex-col justify-center items-center gap-5 cursor-pointer transition-hover"
    >
      <input {...getInputProps()} />
      {isPending ? (
        <div className="w-ful h-full flex flex-col justify-center items-center gap-3 animate-fadeIn">
          <Spinner className="text-gray-400 text-xl" />
          <p>파일을 업로드하는 중입니다... 잠시만 기다려 주세요!</p>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center gap-2 animate-fadeIn">
          {isDragActive ? (
            <>
              <i className="fa-solid fa-cloud-arrow-up text-4xl text-mint-600"></i>
              <p>잘하고 있어요! 파일을 여기 위에 놓으면 업로드됩니다!</p>
            </>
          ) : (
            <>
              <i className="fa-solid fa-cloud-arrow-up text-4xl text-gray-400"></i>
              <p>파일을 올리려면 여기에 끌어다 놓거나 클릭해서 선택하세요!</p>
              {hasError && <p className="font-semibold text-xs">{message}</p>}
              {hasInvalideFileError && (
                <p className="font-semibold text-xs">{hasInvalideFileError}</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
