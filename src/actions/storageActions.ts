'use server'

import { createServerSupabaseClient } from '@/utils/supabase/server'
import { STORAGE_BUCKET_NAME } from '@/constants/supabaseConstants'

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

export async function searchImages(search: string = '') {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.storage.from(STORAGE_BUCKET_NAME).list(undefined, {
    search,
  })

  handleError(error)

  return data
}
