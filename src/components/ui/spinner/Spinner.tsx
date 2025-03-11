interface SpinnerProps {
  className?: string
}

export default function Spinner({ className = '' }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <i className={`fas fa-spinner text-white animate-spin ${className}`}></i>
    </div>
  )
}
