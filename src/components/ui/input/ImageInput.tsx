'use client'

import type { BaseInputProps } from './BaseInput'
import BaseInput from './BaseInput'

//TODO: ImageInputProps 확장
interface ImageInputProps extends Omit<BaseInputProps, 'type'> {}

export default function FileInput({}: ImageInputProps) {
  //TODO: Props 전달
  return <BaseInput type="file" />
}
