export interface BaseInputProps {
  value: string
  onChange: () => void
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  className?: string
}

export default function BaseInput({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  className = '',
}: BaseInputProps) {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={`${className}`}
    />
  )
}
