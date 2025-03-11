'use client'

import type { FormEvent } from 'react'
import { forwardRef } from 'react'
import BaseButton from '../button/BaseButton'
import ImageInput from '../input/ImageInput'

interface ImagePickerProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoading: boolean
}

const ImagePicker = forwardRef<HTMLInputElement, ImagePickerProps>(
  ({ onSubmit, isLoading }, ref) => {
    return (
      <form
        onSubmit={onSubmit}
        className="w-full border-4 border-dashed border-mint-600 py-12 flex flex-col justify-center items-center gap-5"
      >
        <ImageInput ref={ref} />
        <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
        <BaseButton
          type="submit"
          width="w-28"
          bgColor="bg-mint-800"
          className="rounded-lg"
          disabled={isLoading}
        >
          파일 업로드
        </BaseButton>
      </form>
    )
  },
)

ImagePicker.displayName = 'ImagePicker'

export default ImagePicker
