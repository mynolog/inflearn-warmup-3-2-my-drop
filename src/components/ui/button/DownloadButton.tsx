import { useDownloadImage } from '@/hooks/useDownloadImage'
import BaseButton from './BaseButton'

interface DownloadButtonProps {
  imageUrl: string
  fileName: string
  className?: string
}

export default function DownloadButton({
  imageUrl,
  fileName,
  className = '',
}: DownloadButtonProps) {
  const downloadImage = useDownloadImage()

  return (
    <BaseButton className={`${className}`} onClick={() => downloadImage(imageUrl, fileName)}>
      <i className="fas fa-download text-xs"></i>
    </BaseButton>
  )
}
