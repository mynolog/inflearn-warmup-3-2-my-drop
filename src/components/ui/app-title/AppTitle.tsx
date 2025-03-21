type AppTitleProps = {
  className?: string
}

export default function AppTitle({ className = '' }: AppTitleProps) {
  return <span className={className}>MyDrop</span>
}
