export function generateSafeFileName(fileName: string) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const length = 8

  // 파일명 앞뒤 공백 제거 및 유니코드 정규화
  const normalizedFileName = fileName.trim().normalize()

  // 파일명, 확장자 분리
  const fileParts = normalizedFileName.split('.')
  const fileExt = fileParts.length > 1 ? fileParts.pop() : ''
  const fileNameWithoutExt = fileParts.join('.')

  // 한글 및 특수문자 포함 여부 정규식
  const hasKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(fileNameWithoutExt)
  const hasSpecialChars = /[^A-Za-z0-9]/.test(fileNameWithoutExt)

  // 한글 또는 특수문자 포함된 경우 처리
  if (hasKorean || hasSpecialChars) {
    const newFileName = Array.from({ length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length)),
    ).join('')

    return `${newFileName}.${fileExt}`
  }

  return normalizedFileName
}
