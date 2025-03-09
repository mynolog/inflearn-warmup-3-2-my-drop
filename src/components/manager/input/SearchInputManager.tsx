'use client'

import type { ChangeEvent } from 'react'
import { useState } from 'react'
import SearchInput from '@/components/ui/input/SearchInput'

export default function SearchInputManager() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchQuery(value)
  }
  return <SearchInput value={searchQuery} onChange={() => {}} onSearch={() => {}} />
}
