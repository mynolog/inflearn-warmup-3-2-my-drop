'use client'

import { IBM_Plex_Sans_KR } from 'next/font/google'

export interface BaseInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: 'text' | 'file'
  placeholder?: string
  className?: string
}

const ibmPlexSansKR = IBM_Plex_Sans_KR({
  weight: ['400'],
  subsets: ['latin'],
})

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
      className={`px-4 py-2 text-sm border border-gray-300 rounded-lg focus:border-gray-500 transition-focus placeholder:font-bold ${ibmPlexSansKR.className} ${className}`}
    />
  )
}
