'use client'

import type { ChangeEvent } from 'react'
import SearchInput from '@/components/ui/input/SearchInput'
import { useSearchStore } from '@/stores/useSearchStore'

export default function SearchInputManager() {
  const { searchQuery, setSearchQuery } = useSearchStore()

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchQuery(value)
  }

  return <SearchInput value={searchQuery} onChange={handleSearchQueryChange} />
}
