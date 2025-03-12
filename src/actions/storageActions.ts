'use server'

import { createServerSupabaseClient } from '@/utils/supabase/server'
import { DB_TABLE_NAME, STORAGE_BUCKET_NAME } from '@/constants/supabaseConstants'
import { Database } from 'types_db'

export type MydropRow = Database['public']['Tables']['mydrop_files']['Row']
export type MydropInsert = Database['public']['Tables']['mydrop_files']['Insert']
export type MydropUpdate = Database['public']['Tables']['mydrop_files']['Update']

//TODO: 에러 핸들링 고도화
function handleError(error: unknown) {
  if (error) {
    console.error(error)
    throw error
  }
}

export async function uploadImage(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const filesWithNames = Array.from(formData.entries()).reduce(
    (acc, [_, file]) => {
      if (file instanceof File) {
        // 모든 originalFileName 가져오기
        const originalFileNames = formData.getAll('originalFileName') as string[]
        // 파일 순서대로 매칭
        const originalFileName = originalFileNames[acc.length] || file.name
        acc.push({ file, originalFileName })
      }
      return acc
    },
    [] as { file: File; originalFileName: string }[],
  )

  const failedFileNames: string[] = []

  try {
    const results = await Promise.all(
      filesWithNames.map(async ({ file, originalFileName }) => {
        const { error } = await supabase.storage
          .from(STORAGE_BUCKET_NAME)
          .upload(file.name, file, { upsert: true })

        if (error) {
          failedFileNames.push(file.name)
          throw new Error('파일 업로드 중 오류 발생')
        } else {
          // 이미지 URL 가져오기
          const {
            data: { publicUrl },
          } = supabase.storage.from(STORAGE_BUCKET_NAME).getPublicUrl(file.name)
          // 업로드된 안전한 파일명
          const uploadedFileName = file.name
          const { data: files } = await supabase.storage.from(STORAGE_BUCKET_NAME).list()
          // 업로드된 파일 객체
          const uploadedFile = files?.find((file) => file.name === uploadedFileName)
          //TODO: 에러 핸들링 필요
          if (!uploadedFile) {
            return
          }
          const { error: dbError } = await supabase.from(DB_TABLE_NAME).insert({
            name: file.name,
            originalName: originalFileName,
            imageId: uploadedFile.id,
            imageUrl: publicUrl,
            createdAt: new Date(file.lastModified).toISOString(),
          })

          if (dbError) {
            handleError(dbError)
          }
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

export async function getImages(): Promise<MydropRow[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from(DB_TABLE_NAME)
    .select('*')
    .order('createdAt', { ascending: true })

  if (error) {
    handleError(error)
  }

  return data ?? []
}

export async function deleteImage({
  imageId,
  fileName,
}: {
  imageId: MydropRow['imageId']
  fileName: string
}) {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.storage.from(STORAGE_BUCKET_NAME).remove([fileName])

  if (error) {
    handleError(error)
  }

  const { error: dbError } = await supabase.from(DB_TABLE_NAME).delete().eq('imageId', imageId)

  if (dbError) {
    handleError(dbError)
  }

  return data
}
