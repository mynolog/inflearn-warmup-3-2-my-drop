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

  const files = Array.from(formData.entries()).map(([_, file]) => file as File)
  const failedFileNames: string[] = []

  try {
    const results = await Promise.all(
      files.map(async (file) => {
        const { error } = await supabase.storage
          .from(STORAGE_BUCKET_NAME)
          .upload(file.name, file, { upsert: true })

        if (error) {
          failedFileNames.push(file.name)
          throw new Error('파일 업로드 중 오류 발생')
        }

        return { success: true, fileNames: failedFileNames }
      }),
    )

    return results
  } catch (error) {
    console.error('파일 업로드 중 오류 발생:', error)
    throw new Error(
      `다음 파일은 파일명에 한글 또는 특수 문자가 포함되어 업로드할 수 없습니다: ${failedFileNames.join(', ')}`,
    )
  }
}

export async function getImages() {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.storage.from(STORAGE_BUCKET_NAME).list()

  handleError(error)

  return data
}

export async function deleteImage(fileName: string) {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.storage.from(STORAGE_BUCKET_NAME).remove([fileName])

  handleError(error)

  return data
}
