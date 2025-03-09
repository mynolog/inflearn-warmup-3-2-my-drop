'use client'

import type { ChangeEvent } from 'react'
import { useState } from 'react'
import SearchInput from '@/components/ui/input/SearchInput'
// import useDebounce from '@/hooks/useDebounce'

export default function SearchInputManager() {
  const [searchQuery, setSearchQuery] = useState('')

  //TODO: 검색 기능 구현 시 사용 변수(react query 캐싱 데이터 활용 예정)
  //   const debouncedSearchQuery = useDebounce(searchQuery, 600)

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchQuery(value)
  }

  return <SearchInput value={searchQuery} onChange={handleSearchQueryChange} onSearch={() => {}} />
}
