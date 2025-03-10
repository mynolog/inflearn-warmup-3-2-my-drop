'use client'

import DropImage from '../drop-image/DropImage'

export default function DropImageList() {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      <DropImage />
      <DropImage />
      <DropImage />
      <DropImage />
    </section>
  )
}
