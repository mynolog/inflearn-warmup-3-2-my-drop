type TitleProps = {
  className?: string
}

export default function Title({ className = '' }: TitleProps) {
  return <span className={className}>MyDrop</span>
}
