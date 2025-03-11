'use client'

interface ImageInputProps {
  name?: string
  placeholder?: string
  className?: string
}

export default function ImageInput({ placeholder, name, className }: ImageInputProps) {
  return <input name={name} placeholder={placeholder} className={`${className}`} />
}
