'use server'

import { createServerSupabaseClient } from '@/utils/supabase/server'
import { STORAGE_BUCKET_NAME } from '@/constants/supabaseConstants'

//TODO: 에러 핸들링 고도화
function handleError(error: unknown) {
  if (error) {
    console.error(error)
    throw error
  }
}

export async function uploadImage(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  const file = formData.get('file') as File

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET_NAME)
    .upload(file.name, file, { upsert: true })

  handleError(error)

  return data
}

export async function searchImages() {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.storage.from(STORAGE_BUCKET_NAME).list()

  handleError(error)

  return data
}
