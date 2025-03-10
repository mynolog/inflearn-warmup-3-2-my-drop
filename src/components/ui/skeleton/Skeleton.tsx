interface SkeletonProps {
  width?: string
  height?: string
  borderRadius?: string
  className?: string
}

export default function Skeleton({
  width = '100%',
  height = '40px',
  className = '',
}: SkeletonProps) {
  return (
    <div
      className={`bg-gray-100 animate-pulse ${className}`}
      style={{
        width,
        height,
      }}
    ></div>
  )
}
