import Logo from '@/components/ui/logo/Logo'
import SearchInputManager from '@/components/manager/input/SearchInputManager'
import Title from '../../../components/ui/title/Title'

export default function Header() {
  return (
    <div className="max-w-4xl w-full flex flex-col mx-auto px-4">
      <div className="flex items-center gap-2">
        <Logo className="!w-8 !h-auto" />
        <Title className="text-lg font-semibold" />
      </div>
      <SearchInputManager />
    </div>
  )
}
