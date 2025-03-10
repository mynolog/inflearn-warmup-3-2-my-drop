'use client'

import BaseButton from '../button/BaseButton'

export default function DropImage() {
  return (
    <div className="group w-full flex flex-col gap-2 border border-gray-100 rounded-2xl shadow-md overflow-hidden">
      <div className="w-full overflow-hidden">
        {/* TODO: Image 태그로 대체, 더미 url 대체 */}
        <img
          src="https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="sample"
          width={50}
          height={50}
          className="w-full object-cover transition-all duration-150 ease-linear group-hover:scale-1"
        />
      </div>
      <div className="w-full flex items-center justify-between px-2 pb-2 z-50 bg-white">
        <span>sample.png</span>
        <BaseButton className="w-9 h-7 bg-red-500 rounded-lg">
          <i className="fas fa-trash"></i>
        </BaseButton>
      </div>
    </div>
  )
}
