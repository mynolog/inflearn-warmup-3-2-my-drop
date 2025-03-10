'use client'

import ImageInput from '../input/ImageInput'

export default function ImagePicker() {
  return (
    <section className="w-full border-4 border-dashed border-mint-600 py-12 flex flex-col justify-center items-center gap-5">
      {/* TODD: Props 전달 */}
      <ImageInput />
      <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
    </section>
  )
}
