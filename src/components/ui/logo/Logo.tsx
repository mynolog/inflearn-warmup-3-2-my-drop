import Image from 'next/image'

type LogoProps = {
  width?: number
  height?: number
  className?: string
}

export default function Logo({ width = 50, height = 50, className = '' }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/images/logo.png"
        alt="MyDrop Logo"
        width={width}
        height={height}
        className={className}
      />
    </div>
  )
}
