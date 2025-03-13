import imageCompression from 'browser-image-compression'

export default async function compressImage(file: File) {
  try {
    // 1MB(1024 * 1024 bytes) 이하이면 원본 파일 그대로 반환
    if (file.size <= 1024 * 1024) {
      return file
    }

    const compressedBlob = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      // 최대 압축 반복 횟수
      maxIteration: 3,
    })

    const compressedFile = new File([compressedBlob], file.name, {
      type: file.type,
      lastModified: Date.now(),
    })

    return compressedFile
  } catch (error) {
    console.error('이미지 압축 실패:', error)
    // 압축 실패 시 원본 파일 반환
    return file
  }
}
