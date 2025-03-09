import Logo from '@/components/ui/logo/Logo'
import Title from '@/components/ui/Title/Title'
import SearchInputManager from '@/components/manager/input/SearchInputManager'

export default function Header() {
  return (
    <header className="w-full flex flex-col">
      <div className="flex items-center gap-2">
        <Logo className="!w-8 !h-auto" />
        <Title className="text-lg font-semibold" />
      </div>
      <SearchInputManager />
    </header>
  )
}
