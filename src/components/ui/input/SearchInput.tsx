import type { BaseInputProps } from './BaseInput'
import BaseInput from './BaseInput'

interface SearchInputProps extends Omit<BaseInputProps, 'type'> {
  onSearch: () => void
}

export default function SearchInput({
  value,
  onChange,
  placeholder = '무엇을 찾고 있나요?',
  className = '',
}: SearchInputProps) {
  return (
    <BaseInput
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${className}`}
    />
  )
}
