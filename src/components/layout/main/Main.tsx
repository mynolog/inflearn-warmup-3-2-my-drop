import ImagePickerManager from '@/components/manager/image-picker/ImagePickerManager'
import DropImageManager from '@/components/manager/drop-image/DropImageManager'

export default function Main() {
  return (
    <main className="flex flex-col mx-auto py-3 gap-3">
      <ImagePickerManager />
      <DropImageManager />
    </main>
  )
}
