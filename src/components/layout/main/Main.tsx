import ImagePickerManager from '@/components/manager/image-picker/ImagePickerManager'
import DropImageListManager from '@/components/manager/drop-image-list/DropImageListManager'

export default function Main() {
  return (
    <main className="flex flex-col mx-auto py-3 gap-3">
      <ImagePickerManager />
      <DropImageListManager />
    </main>
  )
}
