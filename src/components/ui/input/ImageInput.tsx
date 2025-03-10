import { forwardRef } from 'react'

interface ImageInputProps {
  name?: string
  placeholder?: string
  className?: string
}

const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  ({ placeholder, name, className }, ref) => {
    return (
      <input
        ref={ref}
        type="file"
        name={name}
        placeholder={placeholder}
        className={`${className}`}
      />
    )
  },
)

ImageInput.displayName = 'ImageInput'

export default ImageInput
