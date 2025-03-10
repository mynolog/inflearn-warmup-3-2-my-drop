import Header from '@/components/layout/header/Header'
import Main from '@/components/layout/main/Main'

export default function Home() {
  return (
    <div className="w-full h-screen mx-auto ">
      <header className="fixed w-full bg-gray-100 py-2">
        <Header />
      </header>
      <main className="max-w-4xl w-full mx-auto pt-24 px-4">
        <Main />
      </main>
    </div>
  )
}
