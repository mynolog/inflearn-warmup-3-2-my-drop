'use client'

import type { BaseInputProps } from './BaseInput'
import BaseInput from './BaseInput'

interface SearchInputProps extends Omit<BaseInputProps, 'type'> {
  type?: 'text'
}

export default function SearchInput({
  value,
  onChange,
  placeholder = '여기에서 이미지 검색이 가능합니다!',
  className = '',
  type = 'text',
}: SearchInputProps) {
  return (
    <BaseInput
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${className}`}
    />
  )
}
