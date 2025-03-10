import { STORAGE_BUCKET_NAME } from '@/constants/supabaseConstants'

export function getPublicImageUrl(path: string) {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

  if (!SUPABASE_URL) {
    throw new Error('SUPABASE_URL 환경 변수가 없습니다.')
  }

  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET_NAME}/${path}`
}
