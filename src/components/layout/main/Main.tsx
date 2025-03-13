import ImagePickerManager from '@/components/manager/image-picker/ImagePickerManager'
import DropImageListManager from '@/components/manager/drop-image-list/DropImageListManager'

export default function Main() {
  return (
    <main className="flex flex-col mx-auto py-6 gap-10">
      <ImagePickerManager />
      <DropImageListManager />
    </main>
  )
}
